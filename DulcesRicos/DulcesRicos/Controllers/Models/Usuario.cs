using System.ComponentModel.DataAnnotations;

namespace DulcesRicos.Models
{
    public class Usuario
    {
        public int UsuarioId { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        [EmailAddress]
        public string CorreoElectronico { get; set; }

        [Required]
        public string Contrasena { get; set; }

        public bool EsAdministrador { get; set; }
    }
}
