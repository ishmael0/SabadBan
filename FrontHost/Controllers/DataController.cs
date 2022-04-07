using Core.Services;
using FrontHost.DBContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace FrontHost.Controllers
{
    public class DataController : SabadBanBaseController
    {
        private readonly FrontDB dB;

        public DataController(FrontDB dB)
        {
            this.dB = dB;
        }
        [HttpGet]
        public async Task<JR<object>> Init()
        {
            var Categories = await dB.Categories.ToListAsync();
            var Vendees = await dB.Vendees.CountAsync();
            var Invoices = await dB.Invoices.CountAsync();
            var Vendors = await dB.Vendors.CountAsync();
            return JR<object>.OK(new { Categories, Vendees, Vendors, Invoices });
        }
        [Authorize]
        [HttpGet]
        public async Task<JR<object>> GetInvoices()
        {
            var VendorId = int.Parse(GetVendorID());
            var Invoices = await dB.Invoices.Include(c => c.Vendee)
                .Where(c => c.VendorId == VendorId)
                .Select(c => new { c.InvoiceState, c.InvoiceDetails, c.PostCost, c.PostType, c.Discount, c.Id, c.Create, c.Status, VendorTitle = c.Vendor.Title, c.VendorId, c.VendeeId })
                .ToListAsync();
            return JR<object>.OK(Invoices);
        }
        [HttpGet]
        public async Task<JR<object>> GetInvoice(string guid)
        {
            var VendorId = int.Parse(GetVendorID());
            var Invoices = await dB.Invoices 
                .FirstOrDefaultAsync(c => c.InvoiceState == 0 &&  c.guid == guid)
                .Select(c => new { c.InvoiceState, c.Guid,  c.Paid, c.PostCost, c.PostType, c.Discount, c.Id, c.Create, c.Status, VendorTitle = c.Vendor.Title, c.VendorId, c.VendeeId })
                .ToListAsync();
            return JR<object>.OK(Invoices);
        }

    }
}