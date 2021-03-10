using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using WebApp.Models;

namespace WebApp.Data
{
    public static class PrepDB
    {
        public static void PrepPopulation(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<DataContext>());
            }           
        }

        public static void SeedData(DataContext context)
        {
            System.Console.WriteLine("Applying Migrations...");
            context.Database.Migrate(); //takes latest migrations file and applies it to database
            /*if (!context.Users.Any())
            {
                System.Console.WriteLine("Adding data - seeding...");
                User temp = new User()
                context.Users.Add()
            }*/
        }
    }
}