import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight/flight.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-departing-flight-seats',
  templateUrl: './departing-flight-seats.component.html',
  styleUrls: ['./departing-flight-seats.component.css']
})
export class DepartingFlightSeatsComponent implements OnInit {
  seats: [];

  constructor(private reservationService: ReservationService,
              private flightService: FlightService,
              private router: Router) { }

  ngOnInit(): void {
    //console.log(this.reservationService.selectedDepartingFlight.seats);
    this.seats = this.reservationService.selectedDepartingFlight.seats;
    console.log(this.seats);
  }

  selectSeat(seat) {
    this.reservationService.departingFlightSeat = seat;
    console.log(this.reservationService.departingFlightSeat);
    console.log(this.reservationService.returningFlightSeat);
    
    if (this.flightService.returningFlights.length === 0)
      this.router.navigateByUrl('/reservation-summary');
    else
      this.router.navigateByUrl('/returning-flights');
  }
}
