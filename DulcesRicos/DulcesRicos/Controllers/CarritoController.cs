using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DulcesRicos.Data;
using DulcesRicos.Models;
using System.Linq;
using System.Threading.Tasks;
using System.Globalization;
using System;

namespace DulcesRicos.Controllers
{
    public class CarritoController : Controller
    {
        private readonly DulcesRicosDbContext _context;
        private readonly IEmailSender _emailSender;

        public CarritoController(DulcesRicosDbContext context, IEmailSender emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        // GET: Carrito
        public async Task<IActionResult> Index()
        {
            var carritoItems = await _context.CarritoItems
                .Include(ci => ci.Producto)
                .ToListAsync();

            decimal total = carritoItems.Sum(item => item.Producto.Precio * item.Cantidad);
            ViewBag.Total = total;

            return View(carritoItems);
        }

        // Método para mostrar la vista Checkout
        public IActionResult Checkout()
        {
            var carritoItems = _context.CarritoItems.Include(ci => ci.Producto).ToList();
            decimal total = carritoItems.Sum(item => item.Producto.Precio * item.Cantidad);
            ViewBag.Total = total;

            return View(carritoItems);
        }

        // POST: Carrito/AddToCart/5
        [HttpPost]
        public async Task<IActionResult> AddToCart(int id)
        {
            var producto = await _context.Productos.FindAsync(id);
            if (producto != null && producto.Stock > 0)
            {
                var carritoItem = _context.CarritoItems.FirstOrDefault(ci => ci.ProductoId == id);
                if (carritoItem != null)
                {
                    carritoItem.Cantidad += 1;
                }
                else
                {
                    carritoItem = new CarritoItem { ProductoId = id, Cantidad = 1 };
                    _context.CarritoItems.Add(carritoItem);
                }

                producto.Stock -= 1;
                _context.Productos.Update(producto);

                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index));
        }

        // POST: Carrito/RemoveFromCart/5
        [HttpPost]
        public async Task<IActionResult> RemoveFromCart(int id, int cantidad)
        {
            var carritoItem = await _context.CarritoItems
                .Include(ci => ci.Producto)
                .FirstOrDefaultAsync(ci => ci.ProductoId == id);

            if (carritoItem != null)
            {
                if (carritoItem.Cantidad >= cantidad)
                {
                    // Restar la cantidad seleccionada
                    carritoItem.Cantidad -= cantidad;

                    // Devolver al stock del producto la cantidad eliminada
                    carritoItem.Producto.Stock += cantidad;

                    if (carritoItem.Cantidad == 0)
                    {
                        _context.CarritoItems.Remove(carritoItem); // Eliminar el ítem si ya no queda cantidad
                    }

                    await _context.SaveChangesAsync();

                    // Calcular el nuevo total del carrito
                    var carritoItems = await _context.CarritoItems
                        .Include(ci => ci.Producto)
                        .ToListAsync();

                    decimal nuevoTotal = carritoItems.Sum(item => item.Producto.Precio * item.Cantidad);

                    return Json(new { exito = true, nuevaCantidad = carritoItem.Cantidad, nuevoTotal = nuevoTotal.ToString("C") });
                }
            }

            return Json(new { exito = false, mensaje = "Error al eliminar el producto del carrito." });
        }

        // POST: Carrito/Pagar
        [HttpPost]
        public async Task<IActionResult> Pagar(string nombre, string userEmail, string direccion, string metodoPago, string modoDomicilio)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    // Lógica para procesar el pago (simulado)
                    // No se integran los cambios de stock a la base de datos.

                    // Enviar confirmación de pago por correo
                    string subject = "Pago realizado con éxito";
                    string message = $"Hola {nombre}, tu pago ha sido procesado exitosamente.";
                    await _emailSender.SendEmailAsync(userEmail, subject, message);

                    // Eliminar los artículos del carrito, pero sin afectar el stock
                    var carritoItems = await _context.CarritoItems.ToListAsync();
                    _context.CarritoItems.RemoveRange(carritoItems);
                    await _context.SaveChangesAsync();

                    TempData["SuccessMessage"] = "¡Pago procesado exitosamente!";
                }
                catch (Exception ex)
                {
                    TempData["ErrorMessage"] = "Hubo un problema con el pago. Inténtalo de nuevo.";
                    Console.WriteLine(ex.Message);
                }

                return RedirectToAction("Checkout");
            }

            // Si hay algún error, devolver al formulario de checkout
            TempData["ErrorMessage"] = "Hubo un problema con el pago. Por favor, inténtalo de nuevo.";
            return RedirectToAction("Checkout");
        }
    }
}
