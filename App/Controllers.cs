using Core.Controllers;
using Core.Services;
using BackHost.DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace BackHost
{
    public class VendorController : BaseController<DB, Vendor>
    {
        public VendorController(DB dbContext, UserPermissionManager upm, IOptions<AppSettingPrivates> options) : base(dbContext, upm, options)
        {
        }
        [HttpGet]
        public async Task<JR<bool>> ConfirmVendor([FromQuery] int id)
        {
            var item = await _context.Vendors.FirstOrDefaultAsync(c => c.Id == id);
            if (item == null)
            {
                return JR<bool>.FailureBadRequest("شناسه فروشگاه وجود ندارد");
            }
            _context.VendorSells.Add(new VendorSell { VendorId = id });
            _context.VendorBalances.Add(new VendorBalance { VendorId = id });
            await _context.SaveChangesAsync();
            return JR<bool>.OK("به روز رسانی فروشگاه با موفقیت انجام شد");
        }
    }

    public class InvoiceController : BaseController<DB, Invoice>
    {
        public InvoiceController(DB dbContext, UserPermissionManager upm, IOptions<AppSettingPrivates> options) : base(dbContext, upm, options)
        {

        }
        public override IQueryable<Invoice> BeforeGet(IQueryable<Invoice> q)
        {
            return base.BeforeGet(q).Include(c => c.Vendee).Include(c => c.Vendor);
            //.Select(c=> c with {Vendee = new Vendee {FirstName = c.Vendee.FirstName }            });
        }
    }

}
