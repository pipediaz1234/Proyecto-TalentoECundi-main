using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Threading.Tasks;
using DulcesRicos.Data;
using DulcesRicos.Models;
using DulcesRicos.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;

namespace DulcesRicos.Controllers
{
    public class AccountController : Controller
    {
        private readonly DulcesRicosDbContext _context;

        public AccountController(DulcesRicosDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Login(string? returnUrl = null)
        {
            ViewData["ReturnUrl"] = returnUrl;
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                // Validar el usuario en la base de datos
                var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.CorreoElectronico == model.CorreoElectronico && u.Contrasena == model.Contrasena);

                if (usuario != null)
                {
                    var claims = new[]
                    {
                        new Claim(ClaimTypes.Name, usuario.CorreoElectronico),
                        new Claim(ClaimTypes.Role, usuario.EsAdministrador ? "Admin" : "Usuario")
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var authProperties = new AuthenticationProperties
                    {
                        IsPersistent = true, // Mantener la sesión
                        ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(30) // Tiempo de expiración
                    };

                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity),
                        authProperties);

                    if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                    {
                        return Redirect(returnUrl);
                    }
                    else
                    {
                        return RedirectToAction("Index", "Home");
                    }
                }
                ModelState.AddModelError(string.Empty, "Correo electrónico o contraseña incorrectos.");
            }
            return View(model);
        }

        [HttpGet]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var usuario = new Usuario
                {
                    Nombre = model.Nombre,
                    CorreoElectronico = model.CorreoElectronico,
                    Contrasena = model.Contrasena,
                    EsAdministrador = model.EsAdministrador // Almacena el rol del usuario
                };

                // Guardar el usuario en la base de datos
                _context.Add(usuario);
                await _context.SaveChangesAsync();
                TempData["RegistroExitoso"] = "Registro exitoso. Por favor inicia sesión.";
                return RedirectToAction(nameof(Login));
            }
            return View(model);
        }

        [Authorize]
        [HttpGet]
        public IActionResult Index()
        {
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Account");
        }
    }
}
