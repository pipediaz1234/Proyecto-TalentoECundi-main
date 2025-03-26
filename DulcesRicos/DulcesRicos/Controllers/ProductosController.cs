using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DulcesRicos.Models;
using DulcesRicos.Data;
using System.Linq;
using System.Threading.Tasks;

namespace DulcesRicos.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ProductosController : Controller
    {
        private readonly DulcesRicosDbContext _context;

        public ProductosController(DulcesRicosDbContext context)
        {
            _context = context;
        }

        // GET: Productos
        public async Task<IActionResult> Index()
        {
            var productos = await _context.Productos.ToListAsync();
            return View(productos);
        }

        // GET: Productos/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Productos/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ProductoId,Nombre,Precio,Stock,Imagen,Descripcion")] Producto producto)
        {
            if (ModelState.IsValid)
            {
                _context.Add(producto);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(producto);
        }

        // GET: Productos/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var producto = await _context.Productos.FindAsync(id);
            if (producto == null)
            {
                return NotFound();
            }
            return View(producto);
        }

        // POST: Productos/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ProductoId,Nombre,Precio,Stock,Imagen,Descripcion")] Producto producto)
        {
            if (id != producto.ProductoId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(producto);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProductoExists(producto.ProductoId))
                    {
                        return NotFound();
                    }
                    throw; // Si ocurre un error de concurrencia, se lanza la excepción
                }
                return RedirectToAction(nameof(Index));
            }
            return View(producto);
        }

        // GET: Productos/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var producto = await _context.Productos
                .FirstOrDefaultAsync(m => m.ProductoId == id);
            if (producto == null)
            {
                return NotFound();
            }

            return View(producto);
        }

        // GET: Productos/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var producto = await _context.Productos
                .FirstOrDefaultAsync(m => m.ProductoId == id);
            if (producto == null)
            {
                return NotFound();
            }

            return View(producto);
        }

        // POST: Productos/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto != null)
            {
                try
                {
                    // Verificar si existen elementos en el carrito asociados a este producto
                    var carritoItems = await _context.CarritoItems.Where(ci => ci.ProductoId == id).ToListAsync();
                    if (carritoItems.Any())
                    {
                        TempData["Error"] = "No se puede eliminar el producto porque existen elementos en el carrito asociados a él.";
                        return RedirectToAction(nameof(Index));
                    }

                    _context.Productos.Remove(producto);
                    await _context.SaveChangesAsync();
                    TempData["Success"] = "Producto eliminado correctamente.";
                }
                catch (Exception ex)
                {
                    TempData["Error"] = "Ocurrió un error al intentar eliminar el producto. Por favor, inténtalo nuevamente.";
                    Console.WriteLine(ex.Message); // Mantener esto para fines de depuración, pero considera registrar el error en lugar de solo imprimirlo
                }
            }
            return RedirectToAction(nameof(Index));
        }

        private bool ProductoExists(int id)
        {
            return _context.Productos.Any(e => e.ProductoId == id);
        }
    }
}
