using Core.Services;
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
        [MaxLength(5)]
        [MinLength(5)]
        [StringLength(5, ErrorMessage = "کد ارسالی باید 5 رقم باشد.")]
        public string SMSCode { get; set; }
        public bool IsNew { get; set; }
    }
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly FrontDB dB;
        private readonly SMSService sms;
        private readonly RandomGenerator random;
        public AccountController(FrontDB dB, SMSService sms, RandomGenerator random)
        {
            this.dB = dB;
            this.sms = sms;
            this.random = random;
        }
        [NonAction]
        public async Task<bool> SendMessage(string phoneNumber)
        {
            try
            {
                return await sms.SendAsync(phoneNumber, $"کد اعتبار سنجی شما: {random.PassWordGenerator(0, 0, 5, 0)}");
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
            var user = await dB.Vendees.FirstOrDefaultAsync(c => c.CellPhone == helper.PhoneNumber);
            if (user == null)
            {
                return new JR<bool>(StatusCodes.Status200OK, "این شماره تماس قبلا ثبت نشده است، شما به مرحله ثبت نام هدایت میشوید.", false);
            }
            if (user.Status == Core.Models.Status.Blocked)
            {
                return new JR<bool>(StatusCodes.Status403Forbidden, "دسترسی شما به سامانه مسدود شده است! لطفا با پشتیبانی تماس بگیرید.", true);
            }
            if (user.Status == Core.Models.Status.Active)
            {
                return new JR<bool>(StatusCodes.Status200OK, "", true);
            }
            else
            {
                return new JR<bool>(StatusCodes.Status403Forbidden, "مشکلی روی داده است، لطفا با پشتیبانی تماس بگیرید.", true);
            }
        }

    }
}