using System.ComponentModel.DataAnnotations;

namespace DulcesRicos.Models
{
    public class CarritoItem
    {
        public int Id { get; set; }

        [Display(Name = "Producto")]
        public int ProductoId { get; set; }

        public Producto Producto { get; set; }

        public int Cantidad { get; set; }
    }
}
