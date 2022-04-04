using Core.Services;
using FrontHost.DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FrontHost.Controllers
{
    public class INITController : SabadBanBaseController
    {
        private readonly FrontDB dB;

        public INITController(FrontDB dB)
        {
            this.dB = dB;
        }
        public async Task<JR<object>> InitData()
        {
            var Categories = await dB.Categories.ToListAsync();
            var Vendees = await dB.Vendees.CountAsync();
            var Invoices = await dB.Invoices.CountAsync();
            var Vendors = await dB.Vendors.CountAsync();
            return JR<object>.OK(new { Categories, Vendees, Vendors, Invoices });
        }
    }
}