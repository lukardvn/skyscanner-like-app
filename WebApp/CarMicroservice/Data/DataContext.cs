using CarMicroservice.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarMicroservice.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Car> Cars { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Car>().HasData(new Car { Id = 1, Make = "AudiMS", Model = "A4" },
                                               new Car { Id = 2, Make = "MazdaMS", Model = "CX3" },
                                               new Car { Id = 3, Make = "OpelMS", Model = "Astra K" },
                                               new Car { Id = 4, Make = "PeugeotMS", Model = "308" });
        }
    }
}
