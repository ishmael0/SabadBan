using Core.Services;
using FrontHost.DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using FrontHost.Services;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System;
using FrontHost.Models;
using System.Collections.Generic;
using System.Linq;
using Core.Models;
using Microsoft.AspNetCore.Authorization;

namespace FrontHost.Controllers
{



    public class AccountController : SabadBanBaseController
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
                return new(StatusCodes.Status200OK, "این شماره تماس قبلا ثبت نشده است، شما به مرحله ثبت نام هدایت میشوید.", false);
            }
            if (user.Status == Core.Models.Status.Blocked)
            {
                return new(StatusCodes.Status403Forbidden, "دسترسی شما به سامانه مسدود شده است! لطفا با پشتیبانی تماس بگیرید.", true);
            }
            if (user.Status == Core.Models.Status.Active && await SendMessage(helper.PhoneNumber))
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
                    user = new Models.Vendee { CellPhone = helper.PhoneNumber, CellPhoneConfirm = true };
                    dB.Vendees.Add(user);
                    await dB.SaveChangesAsync();
                    return new(StatusCodes.Status200OK, "ثبت نام شما با موفقیت انجام شد", new UserViewDTO(data.TokenGen(user), user, new List<InvoiceView>()));
                }
                if (user.Status == Core.Models.Status.Blocked)
                {
                    return new(StatusCodes.Status403Forbidden, "دسترسی شما به سامانه مسدود شده است! لطفا با پشتیبانی تماس بگیرید.");
                }
                else
                {

                    return new(StatusCodes.Status200OK, "ورود شما با موفقیت انجام شد", new UserViewDTO(data.TokenGen(user), user, await Invoices(user.Id)));
                }
            }
            else
            {
                return new(StatusCodes.Status403Forbidden, "کد ارسالی نامعتبر است");
            }
        }


        [NonAction]
        public async Task<List<InvoiceView>> Invoices(int id)
        {
            return await dB.Invoices.Include(c => c.Vendee).Where(c => c.VendorId == id).Select(c => new InvoiceView(c.InvoiceState, c.InvoiceDetails, c.PostCost, c.PostType, c.Discount, c.Id, c.Create, c.Status, c.Vendor.Title, c.VendorId, c.VendeeId)).ToListAsync();
        }
        [Authorize]
        [HttpGet]
        public async Task<JR<List<InvoiceView>>> Invoices()
        {
            var VendorId = int.Parse(GetVendorID());
            var Invoices = await dB.Invoices.Include(c => c.Vendee)
                .Where(c => c.VendorId == VendorId)
                .Select(c => new InvoiceView ( c.InvoiceState, c.InvoiceDetails, c.PostCost, c.PostType, c.Discount, c.Id, c.Create, c.Status, c.Vendor.Title, c.VendorId, c.VendeeId ))
                .ToListAsync();
            return JR<List<InvoiceView>>.OK(Invoices);
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
    public class UserViewDTO
    {
        public string Token { get; }
        public Vendee Vendee { get; }
        public List<InvoiceView> Invoices { get; }

        public UserViewDTO(string token, Vendee v, List<InvoiceView> Invoices)
        {
            Token = token;
            Vendee = v;
            this.Invoices = Invoices;
        }
    }

    public class InvoiceView
    {
        public InvoiceState InvoiceState { get; }
        public List<InvoiceDetail> InvoiceDetails { get; }
        public int PostCost { get; }
        public int PostType { get; }
        public int Discount { get; }
        public int Id { get; }
        public DateTime? Create { get; }
        public Status Status { get; }
        public string VendorTitle { get; }
        public int VendorId { get; }
        public int VendeeId { get; }

        public InvoiceView(InvoiceState invoiceState, List<InvoiceDetail> invoiceDetails, int postCost, int postType, int discount, int id, DateTime? create, Status status, string vendorTitle, int vendorId, int vendeeId)
        {
            InvoiceState = invoiceState;
            InvoiceDetails = invoiceDetails;
            PostCost = postCost;
            PostType = postType;
            Discount = discount;
            Id = id;
            Create = create;
            Status = status;
            VendorTitle = vendorTitle;
            VendorId = vendorId;
            VendeeId = vendeeId;
        }
    }
}