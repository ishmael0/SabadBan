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
        [Authorize]
        public async Task<JR<object>> GetInvoices()
        {
            var VendorId = int.Parse(GetVendorID());
            var Invoices = await dB.Invoices.Include(c => c.Vendee)
                .Where(c => c.VendorId == VendorId)
                .Select(c => new {c.Price,c.InvoiceDetails, c.Id , c.Create, c.Status, VendorTitle =  c.Vendor.Title, c.VendorId, c.VendeeId })
                .ToListAsync();
            return JR<object>.OK(Invoices);
        }
    }
}