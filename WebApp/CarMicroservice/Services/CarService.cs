using CarMicroservice.Data;
using CarMicroservice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CarMicroservice.Services
{
    public class CarService : ICarService
    {
        private readonly DataContext _context;
        public CarService(DataContext context)
        {
            _context = context;
        }

        public async Task<bool> DeleteCar(int id)
        {
            bool success = false;
            var car = await _context.Cars.FirstOrDefaultAsync(c => c.Id == id);
            if (car == null)
                return success;

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Car>> GetAllCars()
        {
            return await _context.Cars.ToListAsync();
        }

        public async Task<Car> GetCarById(int id)
        {
            return await _context.Cars.FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
