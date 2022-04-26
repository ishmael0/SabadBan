using System.ComponentModel.DataAnnotations;

namespace FrontHost.Controllers
{
    public class LoginVerifyDTO : LoginFirstStepDTO
    {
        [Required]
        public int SMSCode { get; set; }
        public bool IsNew { get; set; }
        public string MelliCode { get; set; }

    }
}