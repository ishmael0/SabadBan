using BackHost.DBContext;
using Core.Services;
using Core.StartUp;
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
        private readonly DB dB;

        public DataController(DB dB)
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
        [HttpGet]
        public async Task<JR<Invoice>> Invoice(string guid)
        {
            var VendorId = int.Parse(GetVendorID());
            var invoice = await dB.Invoices 
                .Where(c => c.InvoiceState == 0 &&  c.Guid == guid)
                //.Select(c => new { c.InvoiceState, c.Guid,  c.Paid, c.PostCost, c.PostType, c.Discount, c.Id, c.Create, c.Status, VendorTitle = c.Vendor.Title, c.VendorId, c.VendeeId })
                .FirstOrDefaultAsync();
            return JR<Invoice>.OK(invoice);
        }
        [HttpGet]
        public async Task<JR<object>> Vendors(string text, int pageIndex)
        {
            var VendorId = int.Parse(GetVendorID());
            var vendors = await dB.Vendors
                .WhereIfNot( string.IsNullOrWhiteSpace(text) || text.Length<2  ,c => c.Title.Contains(text))
                .Skip(pageIndex*20)
                .Take(20)
                .Include(c=>c.VendorSell)
                .ToListAsync();
            return JR<object>.OK(vendors);
        }
    }
}