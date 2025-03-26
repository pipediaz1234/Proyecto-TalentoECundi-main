using DulcesRicos.Data;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios de controladores y vistas
builder.Services.AddControllersWithViews();

// Agregar autenticaci�n por cookies
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.HttpOnly = true;
        options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
        options.LoginPath = "/Account/Login"; // Ruta de inicio de sesi�n
        options.AccessDeniedPath = "/Account/AccessDenied"; // Ruta de acceso denegado
        options.SlidingExpiration = true; // Permitir la extensi�n de la sesi�n
    });

// Agregar contexto de base de datos
builder.Services.AddDbContext<DulcesRicosDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DulcesRicosConnection"))); // Cambiado a builder.Configuration

// Configurar la secci�n EmailSettings en appsettings.json
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings")); // Cambiado a builder.Configuration

// Registrar el servicio EmailSender como servicio de inyecci�n de dependencias
builder.Services.AddSingleton<IEmailSender, EmailSender>();

var app = builder.Build();

// Configuraci�n de middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Autenticaci�n y autorizaci�n
app.UseAuthentication();
app.UseAuthorization();

// Configuraci�n de rutas de controlador
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Account}/{action=Login}/{id?}");

// Ejecutar la aplicaci�n
app.Run();
