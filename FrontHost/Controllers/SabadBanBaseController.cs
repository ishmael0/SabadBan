using Core.Services;
using FrontHost.DBContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using FrontHost.Services;
using System.Linq;
using BackHost.DBContext;

namespace FrontHost.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SabadBanBaseController : ControllerBase
    {
        public string GetVendorID()
        {
            return HttpContext.User.Claims.FirstOrDefault(c => c.Type == nameof(Vendee.Id))?.Value;
        }
        public int VendorId
        {
            get
            {
                return int.Parse(GetVendorID());
            }
        }
        public string GetUserIP()
        {
            return HttpContext?.Connection?.RemoteIpAddress?.ToString() ?? "";
        }

        public string GetCellPhone()
        {
            return HttpContext.User.Claims.FirstOrDefault(c => c.Type == nameof(Vendee.CellPhone))?.Value;
        }
    }
}