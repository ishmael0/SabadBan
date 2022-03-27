using Core.Services;
using Core.StartUp;
using FrontHost.DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace FrontHost.Controllers
{

    public class SMSService
    {
        public async Task<bool> SendAsync(string phoneNumber, string text)
        {
            await Task.Delay(2000);
            return true;
        }
    }

    public class SMSDataStoreHelper
    {
        public int Code { get; set; }
        public int Count { get; set; }
        public DateTime LastTryDateTime { set; get; }
    }
    public class DataService
    {
        public DataService()
        {

            VerificationCodes = new(this, async (s, d, prev) =>
            {
                if (prev == null)
                {
                    var x = new SMSDataStoreHelper
                    {
                        Code = RandomGenerator.NextInt(10000, 99999),
                        Count = 1,
                        LastTryDateTime = DateTime.Now
                    };
                    return x;
                }
                else
                {
                    prev.Data.Count++;
                    if (prev.Data.LastTryDateTime < DateTime.Now.AddHours(-1))
                    {
                        prev.Data.Count /= 2;
                    }
                    if (prev.Data.Count > Captcha.MaxTries) return null;
                    prev.Data.Code = RandomGenerator.NextInt(10000, 99999);
                    prev.Data.LastTryDateTime = DateTime.Now;
                    return prev.Data;
                }
            }, new TimeSpan(0, 2, 0));
        }
        public DictionaryCacheManager<string, DataService, SMSDataStoreHelper> VerificationCodes;
        public bool IsVerificationCodeValid(string phone, int code)
        {
            if (VerificationCodes.TryGetValue(phone, out var verificationCode) && verificationCode.Data.Code == code)
            {
                return true;
            }
            return false;
        }
        public bool RefreshVerificationCode(string phone, out int verificationCode)
        {
            if (VerificationCodes.TryGetValue(phone, out var v, true))
            {
                verificationCode = v.Data.Code;
                return true;
            }
            verificationCode = 0;
            return false;
        }
    }


    public class LoginFirstStepDTO
    {
        [Required]
        [MaxLength(11)]
        [MinLength(11)]
        [StringLength(11, ErrorMessage = "شماره همراه باید 11 رقم باشد")]
        public string PhoneNumber { get; set; }
    }
    public class LoginVerifyDTO : LoginFirstStepDTO
    {
        [Required]
        public int SMSCode { get; set; }
        public bool IsNew { get; set; }
    }
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly FrontDB dB;
        private readonly SMSService sms;
        private readonly DataService data;

        public AccountController(FrontDB dB, SMSService sms, DataService data)
        {
            this.dB = dB;
            this.sms = sms;
            this.data = data;
        }
        [NonAction]
        public async Task<bool> SendMessage(string phoneNumber)
        {
            try
            {
                if (data.RefreshVerificationCode(phoneNumber, out var v))
                    return await sms.SendAsync(phoneNumber, $"کد اعتبار سنجی شما: {v}");
                return false;
            }
            catch (Exception e)
            {
#warning serilog
            }
            return false;
        }
        public async Task<JR<bool>> LogIn([FromBody] LoginFirstStepDTO helper)
        {
            var user = await dB.Vendees.FirstOrDefaultAsync(c => c.CellPhone == helper.PhoneNumber);
            if (user == null && await SendMessage(helper.PhoneNumber))
            {
                return new JR<bool>(StatusCodes.Status200OK, "این شماره تماس قبلا ثبت نشده است، شما به مرحله ثبت نام هدایت میشوید.", false);
            }
            if (user.Status == Core.Models.Status.Blocked)
            {
                return new JR<bool>(StatusCodes.Status403Forbidden, "دسترسی شما به سامانه مسدود شده است! لطفا با پشتیبانی تماس بگیرید.", true);
            }
            if (user.Status == Core.Models.Status.Active && await SendMessage(helper.PhoneNumber))
            {
                return new JR<bool>(StatusCodes.Status200OK, "", true);
            }
            return new JR<bool>(StatusCodes.Status403Forbidden, "مشکلی روی داده است، لطفا با پشتیبانی تماس بگیرید.", true);
#warning if sms already sent
        }
        [HttpPost]
        public async Task<JR<bool>> Verify([FromBody] LoginVerifyDTO helper)
        {
            if (data.IsVerificationCodeValid(helper.PhoneNumber, helper.SMSCode))
            {
                var user = await dB.Vendees.FirstOrDefaultAsync(c => c.CellPhone == helper.PhoneNumber);
                if (user == null)
                {
                    dB.Vendees.Add(new Models.Vendee { CellPhone = helper.PhoneNumber, CellPhoneConfirm = true });
                    return new JR<bool>(StatusCodes.Status200OK, "ثبت نام شما با موفقیت انجام شد", false);
                }
                if (user.Status == Core.Models.Status.Blocked)
                {
                    return new JR<bool>(StatusCodes.Status403Forbidden, "دسترسی شما به سامانه مسدود شده است! لطفا با پشتیبانی تماس بگیرید.", true);
                }
                else{
                    return new JR<bool>(StatusCodes.Status200OK, "ورود شما با موفقیت انجام شد", false);
                }
            }
            else
            {
                return new JR<bool>(StatusCodes.Status403Forbidden, "کد ارسالی نامعتبر است", true);
            }
        }

    }
}