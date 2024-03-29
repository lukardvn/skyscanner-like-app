﻿using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Dtos.Reservation
{
    public class AddReservationDto
    {
        public int UserId { get; set; }
        public Models.User? User { get; set; }
        public Models.Flight DepartingFlight { get; set; }
        public Models.Flight ReturningFlight { get; set; }
        //public int DepartingFlightSeatId { get; set; }
        //public int? ReturningFlightSeatId { get; set; }
        public Models.Seat DepartingFlightSeat { get; set; }
        public Models.Seat? ReturningFlightSeat { get; set; }

    }
}
