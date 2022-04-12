import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { InvitationDto } from 'src/models/InvitationDto';

@Component({
  selector: 'app-invitation-departing-seats',
  templateUrl: './invitation-departing-seats.component.html',
  styleUrls: ['./invitation-departing-seats.component.css']
})
export class InvitationDepartingSeatsComponent implements OnInit {
  depFlightSeat;
  retFlightSeat;

  depFlight;
  retFlight;

  friendsDepSeat: any = {}; // bili su null
  friendsRetSeat: any = {};

  constructor(private invitationService: InvitationService,
              private reservationService: ReservationService,
              private router: Router,
              private authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) { } 

  ngOnInit(): void {
    console.log(this.data);

    this.depFlight = this.reservationService.selectedDepartingFlight;
    this.depFlightSeat = this.reservationService.departingFlightSeat;
    this.friendsDepSeat.number = 0;

    if (this.reservationService.selectedReturningFlight !== null) {
      this.retFlight = this.reservationService.selectedReturningFlight;
      this.retFlightSeat = this.reservationService.returningFlightSeat;
      this.friendsRetSeat.number = 0;
    }
  }

  chooseDepSeat(seat) {
    this.friendsDepSeat = seat;
    console.log(this.friendsDepSeat);
  }

  chooseRetSeat(seat) {
    this.friendsRetSeat = seat;
    console.log(this.friendsRetSeat);
  }

  inviteAndFinish() { // ovde bih trebalo da ocistim reservationService varijable... i zapravo posaljem pozivnicu
    //poslati pozivnicu, zatvoriti modal...
    let invite = new InvitationDto({
      //UserSendingId: + this.authService.currentUser.nameid,
      UserReceiving: this.data,
      DepartingFlightId: this.reservationService.selectedDepartingFlight.id,
      ReturningFlightId: this.reservationService.selectedReturningFlight ? this.reservationService.selectedReturningFlight.id : 0,
      //DepartingFlightSeatId: this.reservationService.departingFlightSeat.id,
      //ReturningFlightSeatId: this.reservationService.returningFlightSeat ? this.reservationService.returningFlightSeat.id : 0
      DepartingFlightSeatId: this.friendsDepSeat.id,
      ReturningFlightSeatId: this.friendsRetSeat.id
    });

    this.reservationService.selectedDepartingFlight = null;
    this.reservationService.selectedReturningFlight = null;
    this.reservationService.departingFlightSeat = null;
    this.reservationService.returningFlightSeat = null;

    console.log("INVITE TO SEND");
    console.log(invite);

    /*this.invitationService.createInvitation(invite).subscribe(result=> {
      if (result.data !== null){
        console.log("STA SMO DOBILI NAZAD OD SERVERA");
        console.log(result.data);
        this.invitationService.holdSeat(result.data.departingFlightSeat).subscribe();

        if (result.data.returningFlighSeat !== null){
          this.invitationService.holdSeat(result.data.returningFlighSeat).subscribe();
          //this.router.navigateByUrl("/list-invitations");
        }

        //this.router.navigateByUrl("/list-invitations");     
      }
    });*/

    this.invitationService.createInvitation(invite).subscribe(result1 => {
      this.invitationService.holdSeat(result1.data.departingFlightSeat).subscribe();

      if (result1.data.returningFlightSeat !== null){
        console.log("USAO !== null")
        this.invitationService.holdSeat(result1.data.returningFlightSeat).subscribe();
        this.router.navigateByUrl('/reservation-summary/success');
      }

      this.router.navigateByUrl('/reservation-summary/success');
    })
  }
}