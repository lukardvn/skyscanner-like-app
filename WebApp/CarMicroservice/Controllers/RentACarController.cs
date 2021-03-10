using CarMicroservice.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarMicroservice.Controllers
{
    [Route("Car")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;
        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet("GetAll")] // localhost/Car/GetAll
        public async Task<IActionResult> Get()
        {
            return Ok(await _carService.GetAllCars());
        }

        [HttpGet("{id}")] // localhost/Car/x
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _carService.GetCarById(id));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return Ok(await _carService.DeleteCar(id));
        }
    }
}
