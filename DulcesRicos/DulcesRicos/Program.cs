using DulcesRicos.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios de controladores y vistas
builder.Services.AddControllersWithViews();

// Agregar autenticación por cookies
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
        options.LoginPath = "/Account/Login"; // Ruta de inicio de sesión
        options.AccessDeniedPath = "/Account/AccessDenied"; // Ruta de acceso denegado
        options.SlidingExpiration = true; // Permitir la extensión de la sesión
    });

// Agregar contexto de base de datos
builder.Services.AddDbContext<DulcesRicosDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DulcesRicosConnection"))); // Cambiado a builder.Configuration

// Configurar la sección EmailSettings en appsettings.json
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings")); // Cambiado a builder.Configuration

// Registrar el servicio EmailSender como servicio de inyección de dependencias
builder.Services.AddSingleton<IEmailSender, EmailSender>();

var app = builder.Build();

// Configuración de middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// Configuración de rutas de controlador
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

// Ejecutar la aplicación
app.Run();
