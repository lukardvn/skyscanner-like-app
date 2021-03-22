import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { Invitation } from 'src/models/Invitation';
import { InvitationDto } from 'src/models/InvitationDto';
import { InvitationDepartingSeatsComponent } from '../invitation-departing-seats/invitation-departing-seats.component';

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
              private invitationService: InvitationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.friendshipService.getFriends().subscribe(result => {
      this.friends = [...result.data];
    });
  }

  goToReservationSummary(){
    this.router.navigateByUrl('/reservation-summary');
  }

  //  STARI NACIN, RADI BEZ SEDISTA
  /*inviteFriend(event: any, friend: any){
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
  }*/

  inviteFriendAndShowModal(friend: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = friend;

    this.dialog.open(InvitationDepartingSeatsComponent, dialogConfig);
  }

}
