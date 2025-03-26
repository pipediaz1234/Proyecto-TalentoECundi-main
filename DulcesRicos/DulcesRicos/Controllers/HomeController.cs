using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DulcesRicos.Data;
using DulcesRicos.Models;
using System.Linq;
using System.Threading.Tasks;

namespace DulcesRicos.Controllers
{
    public class HomeController : Controller
    {
        private readonly DulcesRicosDbContext _context;

        public HomeController(DulcesRicosDbContext context)
        {
            _context = context;
        }

        // Método para cargar la página principal con la lista de productos
        public async Task<IActionResult> Index()
        {
            var productos = await _context.Productos.ToListAsync();
            return View(productos);
        }

        // Método para agregar productos al carrito con cantidad seleccionada
        [HttpPost]
        public async Task<IActionResult> AddToCart(int id, int cantidad)
        {
            // Buscar el producto por ID
            var producto = await _context.Productos.FindAsync(id);

            // Validar que el producto exista y que la cantidad deseada sea menor o igual al stock disponible
            if (producto != null && producto.Stock >= cantidad)
            {
                // Buscar si el producto ya existe en el carrito
                var carritoItem = _context.CarritoItems.FirstOrDefault(ci => ci.ProductoId == id);

                // Si el producto ya está en el carrito, simplemente incrementamos la cantidad
                if (carritoItem != null)
                {
                    carritoItem.Cantidad += cantidad;
                }
                else
                {
                    // Si no está en el carrito, lo agregamos con la cantidad seleccionada
                    carritoItem = new CarritoItem { ProductoId = id, Cantidad = cantidad };
                    _context.CarritoItems.Add(carritoItem);
                }

                // Actualizamos el stock del producto restando la cantidad comprada
                producto.Stock -= cantidad;
                _context.Productos.Update(producto);

                // Guardamos los cambios en la base de datos
                await _context.SaveChangesAsync();
            }

            // Redirigimos a la página de Checkout después de agregar al carrito
            return RedirectToAction("Index", "Carrito");
        }
    }
}
