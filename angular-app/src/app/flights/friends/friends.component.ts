import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { Invitation } from 'src/models/Invitation';
import { InvitationDto } from 'src/models/InvitationDto';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: any;
  @Input() reservationDto: any;

  constructor(private friendshipService: FriendshipService,
              private router: Router,
              private toastr: ToastrService,
              private invitationService: InvitationService) { }

  ngOnInit(): void {
    console.log("CHILD OBJJJJJ"); 
    console.log(this.reservationDto);

    this.friendshipService.getFriends().subscribe(result => {
      this.friends = [...result.data];
    });
  }

  goToReservationSummary(){
    this.router.navigateByUrl('/reservation-summary');
  }

  inviteFriend(event: any, friend: any){
    this.toastr.success( `${friend.name} ${friend.surname}`, 'invitation sent to');
    event.target.disabled = true;

    let invite = new Invitation({
      UserSendingId: + this.reservationDto.UserId,
      UserReceiving: friend,
      DepartingFlightId: this.reservationDto.DepartingFlight.id,
      ReturningFlightId: this.reservationDto.ReturningFlight ? this.reservationDto.ReturningFlight.id : 0
    });

    console.log(invite);
    this.invitationService.createInvitation(invite).subscribe(result=> {
      console.log(result.data);
    });
  }

  /*inviteFriend(event: any, friend: any){ 
    this.toastr.success( `${friend.name} ${friend.surname}`, 'invitation sent to');
    event.target.disabled = true;

    let invite;
    if (this.reservationDto.ReturningFlight !== null){
      invite = new InvitationDto({
        UserReceivingId: friend.id,
        UserSendingId: +this.reservationDto.UserId,
        DepartingFlightId: this.reservationDto.DepartingFlight.id,
        ReturningFlightId: this.reservationDto.ReturningFlight.id
      });
    } else {
      invite = new InvitationDto({
        UserReceivingId: friend.id,
        UserSendingId: +this.reservationDto.UserId,
        DepartingFlightId: this.reservationDto.DepartingFlight.id,
        ReturningFlightId: 0
      });
    }   
    console.log(invite); //ovded poziv servisa koji postuje invitaciju
    this.invitationService.createInvitation(invite).subscribe(result=> {
      console.log(result.data);
    });

    //ovde bi trebalo da post-ujem Invitation objekat koji sadrzi polja napravljene rezervacije kao i polje User kome saljemo pozivnicu
    //Reservation objekat treba da izvucem iz prethodne stranice: reservation-summary
    // { DepartingFlight, ReturningFlight, UserId(moj id, UserKomSaljem) }
  }*/
}
