import { Router } from '@angular/router';
import { ReservationDto } from './../../../models/ReservationDto';
import { AuthService } from './../../services/auth/auth.service';
import { ReservationService } from './../../services/reservation/reservation.service';
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { flatMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-reservation-summary',
  templateUrl: './reservation-summary.component.html',
  styleUrls: ['./reservation-summary.component.css']
})
export class ReservationSummaryComponent implements OnInit {
  departingFlight: any;
  returningFlight: any;

  constructor(private reservationService: ReservationService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.departingFlight = this.reservationService.selectedDepartingFlight;
    this.returningFlight = this.reservationService.selectedReturningFlight;
  }

  confirmReservation() {  
    let reservation = new ReservationDto({
      DepartingFlight: this.departingFlight,
      ReturningFlight: this.returningFlight,
      //UserId: this.authService.currentUser.nameid,
      DepartingFlightSeat: this.reservationService.departingFlightSeat,
      ReturningFlightSeat: this.reservationService.returningFlightSeat
    });
    
    console.log(reservation);

    //IPAK NE BRISEM ZBOG MODALA
    //this.reservationService.departingFlightSeat = null;
    //this.reservationService.returningFlightSeat = null;
    //this.reservationService.selectedDepartingFlight = null;
    //this.reservationService.selectedReturningFlight = null;

    this.reservationService.addReservation(reservation).subscribe(result1 => {
      this.reservationService.updateSeat(result1.data.departingFlightSeat).subscribe();

      if (result1.data.returningFlightSeat !== null){
        this.reservationService.updateSeat(result1.data.returningFlightSeat).subscribe();
        this.router.navigateByUrl('/reservation-summary/success');
      }

      this.router.navigateByUrl('/reservation-summary/success');
    })

     /*this.reservationService.addReservation(reservation).pipe(
      mergeMap((result1) => this.reservationService.updateSeat(result1.data.departingFlightSeat)),
    ).subscribe(() => {
      this.router.navigateByUrl('/reservation-summary/success');
    });*/
  }
}
