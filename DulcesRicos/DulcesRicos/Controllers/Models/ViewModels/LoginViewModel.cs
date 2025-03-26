using System.ComponentModel.DataAnnotations;

namespace DulcesRicos.Models.ViewModels
{
    public class LoginViewModel
    {
        [Required]
        [EmailAddress]
        public string CorreoElectronico { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Contrasena { get; set; }
    }
}
