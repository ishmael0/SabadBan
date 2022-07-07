using Core.Services;
using FrontHost.DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FrontHost.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using Core.Models;
using Microsoft.AspNetCore.Authorization;
using BackHost.DBContext;

namespace FrontHost.Controllers
{
    public class AccountController : SabadBanBaseController
    {
        private readonly DB dB;
        private readonly SMSService sms;
        private readonly DataService data;
        public AccountController(DB dB, SMSService sms, DataService data)
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
                return new(StatusCodes.Status200OK, "این شماره تماس قبلا ثبت نشده است، شما به مرحله ثبت نام هدایت میشوید.", false);
            }
            if (user.Status ==Statuses.Blocked)
            {
                return new(StatusCodes.Status403Forbidden, "دسترسی شما به سامانه مسدود شده است! لطفا با پشتیبانی تماس بگیرید.", true);
            }
            if (user.Status == Statuses.Published && await SendMessage(helper.PhoneNumber))
            {
                return new(StatusCodes.Status200OK, "", true);
            }
            return new(StatusCodes.Status403Forbidden, "مشکلی روی داده است، لطفا با پشتیبانی تماس بگیرید.", true);
        }
        [HttpPost]
        public async Task<JR<UserViewDTO>> Verify([FromBody] LoginVerifyDTO helper)
        {
            if (data.IsVerificationCodeValid(helper.PhoneNumber, helper.SMSCode))
            {
                var user = await dB.Vendees.FirstOrDefaultAsync(c => c.CellPhone == helper.PhoneNumber);
                if (user == null)
                {
                    user = new Vendee { MelliCode = helper.MelliCode, CellPhone = helper.PhoneNumber, CellPhoneConfirm = true,Status = Statuses.Published };
                    dB.Vendees.Add(user);
                    await dB.SaveChangesAsync();
                    return new(StatusCodes.Status200OK, "ثبت نام شما با موفقیت انجام شد", new UserViewDTO(data.TokenGen(user), user));
                }
                if (user.Status == Statuses.Blocked)
                {
                    return new(StatusCodes.Status403Forbidden, "دسترسی شما به سامانه مسدود شده است! لطفا با پشتیبانی تماس بگیرید.");
                }
                else
                {

                    return new(StatusCodes.Status200OK, "ورود شما با موفقیت انجام شد", new UserViewDTO(data.TokenGen(user), user));
                }
            }
            else
            {
                return new(StatusCodes.Status403Forbidden, "کد ارسالی نامعتبر است");
            }
        }
        [HttpPost]
        [Authorize]
        public async Task<JR<Vendee>> Profile([FromBody] Vendee v)
        {
            var ven = await dB.Vendees.FirstOrDefaultAsync(c => c.Id == VendorId);
            ven.FirstName = v.FirstName;
            ven.LastName = v.LastName;
            await dB.SaveChangesAsync();
            return new(StatusCodes.Status200OK, "  با موفقیت ذخیره شد", ven);
        }
    }
}