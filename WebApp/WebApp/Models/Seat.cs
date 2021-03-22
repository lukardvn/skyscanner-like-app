using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApp.Models.Enums;

namespace WebApp.Models
{
    public class Seat
    {
        public int Id { get; set; }
        public int Number { get; set; }
        public SeatState State { get; set; }
        public Flight Flight { get; set; }
    }
}
