using BackHost.DBContext;
using Core.Services;
using Core.StartUp;
using FrontHost.DBContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FrontHost.Controllers
{
    public static class DBHelper
    {
        public async static Task<List<Invoice>> GetVendeeInvoicesAsync(this DB dB, int id)
        {
            //.Select(c => new InvoiceView (c.Guid, c.InvoiceState, c.InvoiceDetails, c.PostCost, c.PostType, c.Discount, c.Id, c.Create, c.Status, c.Vendor.Title, c.VendorId, c.VendeeId ))
            var Invoices = await dB.Invoices.Include(c => c.Vendee).Where(c => c.VendeeId == id)
                .Include(c=>c.Vendor)
                .ToListAsync();
            return Invoices;
        }
        public async static Task<Invoice> GetInvoiceAsync(this DB dB, string guid)
        {
            //.Select(c => new { c.InvoiceState, c.Guid,  c.Paid, c.PostCost, c.PostType, c.Discount, c.Id, c.Create, c.Status, VendorTitle = c.Vendor.Title, c.VendorId, c.VendeeId })
            var invoice = await dB.Invoices.Where(c => c.InvoiceState == 0 && c.Guid == guid).FirstOrDefaultAsync();
            return invoice;
        }
    }



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
            return JR<object>.OK(new { Categories, Statics = new { Vendees, Vendors, Invoices } });
        }
        [Authorize]
        [HttpGet]
        public async Task<JR<List<Invoice>>> Invoices()
        {
            return JR<List<Invoice>>.OK(await dB.GetVendeeInvoicesAsync(VendeeId));
        }
        [HttpGet]
        public async Task<JR<Invoice>> Invoice(string guid)
        {
            return JR<Invoice>.OK(await dB.GetInvoiceAsync(guid));
        }
        [HttpGet]
        public async Task<JR<object>> Vendors(string text, int pageIndex)
        {
            var vendors = await dB.Vendors
                .WhereIfNot(string.IsNullOrWhiteSpace(text) || text.Length < 2, c => c.Title.Contains(text))
                .Skip(pageIndex * 20)
                .Take(20)
                .Include(c => c.VendorSell)
                .ToListAsync();
            return JR<object>.OK(vendors); 
        }
    }
}