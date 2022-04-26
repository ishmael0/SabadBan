using System.ComponentModel.DataAnnotations;

namespace FrontHost.Controllers
{
    public class LoginFirstStepDTO
    {
        [Required]
        [MaxLength(11)]
        [MinLength(11)]
        [StringLength(11, ErrorMessage = "شماره همراه باید 11 رقم باشد")]
        public string PhoneNumber { get; set; }
    }
}