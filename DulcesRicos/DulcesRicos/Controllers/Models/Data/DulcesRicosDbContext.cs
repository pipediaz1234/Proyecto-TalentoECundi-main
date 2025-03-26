using Microsoft.EntityFrameworkCore;
using DulcesRicos.Models;
using System.Collections.Generic;

namespace DulcesRicos.Data
{
    public class DulcesRicosDbContext : DbContext
    {
        public DulcesRicosDbContext(DbContextOptions<DulcesRicosDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Producto> Productos { get; set; }
        public DbSet<CarritoItem> CarritoItems { get; set;}
    }
}
