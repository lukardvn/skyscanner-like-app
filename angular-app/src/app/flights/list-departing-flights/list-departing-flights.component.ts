import { ReservationService } from './../../services/reservation/reservation.service';
import { FlightService } from './../../services/flight/flight.service';
import { Component, OnInit } from '@angular/core';
import { Flight } from 'src/models/Flight';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-departing-flights',
  templateUrl: './list-departing-flights.component.html',
  styleUrls: ['./list-departing-flights.component.css']
})
export class ListDepartingFlightsComponent implements OnInit {
  flights: Flight[] = this.flightService.departingFlights;
  returning: Flight[] = this.flightService.returningFlights;

  constructor(private flightService: FlightService,
              private reservationService: ReservationService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    /*console.log(this.flights);
    console.log(this.returning);
    console.log("Duzina1: " + this.flights.length);
    console.log("Duzina2: " + this.returning.length);*/
  }

  select(flight: Flight) {
    this.reservationService.selectedDepartingFlight = flight;
    this.router.navigateByUrl('/departing-flight-seats');
    /*if (this.flightService.returningFlights.length === 0){
      this.router.navigateByUrl('/reservation-summary');
      this.toastr.info('flight selected', 'success', {
        timeOut: 1000,
      });
    }
      //this.router.navigateByUrl('/reservation/invite-friends');
    else
      //this.router.navigateByUrl('/returning-flights');
      this.router.navigateByUrl('/departing-flight-seats');*/
  }
}
