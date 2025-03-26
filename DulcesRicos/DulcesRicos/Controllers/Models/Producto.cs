using System.ComponentModel.DataAnnotations;

namespace DulcesRicos.Models
{
    public class Producto
    {

        public int ProductoId { get; set; }

        [Required]
        public string Nombre { get; set; }

        [Required]
        [DataType(DataType.Currency)]
        public decimal Precio { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int Stock { get; set; }

        public string Imagen { get; set; }

        [DataType(DataType.MultilineText)]
        public string Descripcion { get; set; }
    }
}
