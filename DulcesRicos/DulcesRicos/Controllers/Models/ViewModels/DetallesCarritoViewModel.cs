using DulcesRicos.Models;
using System.Collections.Generic;

namespace DulcesRicos.Models.ViewModels
{
    public class DetallesCarritoViewModel
    {
        public List<CarritoItem> CarritoItems { get; set; }
        public decimal Total { get; set; } // Agregar la propiedad Total de tipo decimal
        public string NombreUsuario { get; set; }
        public string CorreoUsuario { get; set; }
    }
}
