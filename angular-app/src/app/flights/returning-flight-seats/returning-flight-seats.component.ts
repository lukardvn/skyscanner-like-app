import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from 'src/app/services/flight/flight.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';

@Component({
  selector: 'app-returning-flight-seats',
  templateUrl: './returning-flight-seats.component.html',
  styleUrls: ['./../departing-flight-seats/departing-flight-seats.component.css']
})
export class ReturningFlightSeatsComponent implements OnInit {
  seats: [];

  constructor(private reservationService: ReservationService,
              private flightService: FlightService,
              private router: Router) { }

  ngOnInit(): void {
    this.seats = this.reservationService.selectedReturningFlight.seats;
    console.log(this.seats);
  }

  selectSeat(seat) {
    this.reservationService.returningFlightSeat = seat;
    console.log(this.reservationService.departingFlightSeat);
    console.log(this.reservationService.returningFlightSeat);
    
    this.router.navigateByUrl('/reservation-summary');
  }
}
