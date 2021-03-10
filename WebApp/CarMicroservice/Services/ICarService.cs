using CarMicroservice.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarMicroservice.Services
{
    public interface ICarService
    {
        Task<List<Car>> GetAllCars();
        Task<Car> GetCarById(int id);
        Task<bool> DeleteCar(int id);
    }
}
