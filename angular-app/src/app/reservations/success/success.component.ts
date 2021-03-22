import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ReservationDto } from 'src/models/ReservationDto';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {
  myReservation: any;
  
  constructor(private reservationService: ReservationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    /*this.myReservation = new ReservationDto({
      DepartingFlight: this.reservationService.selectedDepartingFlight,
      ReturningFlight: this.reservationService.selectedReturningFlight,
      UserId: this.authService.currentUser.nameid
    });*/ //ovo je za prethodnu verziju gde ovo prosledjujem friends-componenti
  }  

  skipAndFinish(){ //ocistiti varijable iz servisa
    this.reservationService.departingFlightSeat = null;
    this.reservationService.returningFlightSeat = null;
    this.reservationService.selectedDepartingFlight = null;
    this.reservationService.selectedReturningFlight = null;
  }
}