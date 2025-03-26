using System.ComponentModel.DataAnnotations;

namespace DulcesRicos.Models.ViewModels
{
    public class RegisterViewModel
    {
        [Required]
        public string Nombre { get; set; }

        [Required]
        [EmailAddress]
        public string CorreoElectronico { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Contrasena { get; set; }
        public bool EsAdministrador { get; set; } // Propiedad para indicar si es administrador
    }
}
