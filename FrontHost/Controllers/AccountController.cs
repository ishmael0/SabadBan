using DBContext;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace FrontHost.Controllers
{
    public class LoginDTO {
        [Required]
        [MaxLength(11)]
        [MinLength(11)]
        [StringLength(11,ErrorMessage = "شماره همراه باید 11 رقم باشد")]
        public string PhoneNumber { get; set; }

    }

    [ApiController]
    [Route("api/[controller]/[action]")]
    public class AccountController : ControllerBase
    {
        private readonly DB dB;

        public AccountController(DBContext.DB dB)
        {
            this.dB = dB;
        }
        [HttpPost]
        public async void LogIn([FromBody] LoginDTO helper )
        {
            if(await dB.Vendees.Any(c=>c.CellPhone == helper.PhoneNumber))
            {

            }
        }
    }
}