import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { Invitation } from 'src/models/Invitation';
import { Reservation } from 'src/models/Reservation';
import { ReservationDto } from 'src/models/ReservationDto';

@Component({
  selector: 'app-invitation-detail',
  templateUrl: './invitation-detail.component.html',
  styleUrls: ['./invitation-detail.component.css']
})
export class InvitationDetailComponent implements OnInit {
  invitation: any;

  constructor(private invitationService: InvitationService,
              private reservationService: ReservationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");

    this.invitationService.getInvitation(+id).subscribe(result => {
      this.invitation = result.data;

      console.log(this.invitation);
    });
  }

  acceptInvitation(){//dodaje se novi reservation pa se brise iz liste pozivnica
    let reservation = new ReservationDto({
      DepartingFlight: this.invitation.departingFlight,
      ReturningFlight: this.invitation.returningFlight,
      UserId: this.invitation.userReceivingId
    });

    // nakon subskrajba na addreservation, treba subskrajb na invitationservice.deleteInvitation
    /*this.toDoListService.updateTodoListPosition(dragged, list.position).pipe(
      flatMap(() => this.toDoListService.getTodoLists())
    ).subscribe(reorderedLists => {
      this.todoLists = reorderedLists;
    })*/

    this.reservationService.addReservation(reservation).pipe(
      flatMap(() => this.invitationService.deleteInvitation(this.invitation.id))).subscribe();
    
    /*this.reservationService.addReservation(reservation).subscribe(result => {
      console.log(result);
    })*/
  }

  rejectInvitation(){ //brise se iz liste pozivnica
    this.invitationService.deleteInvitation(this.invitation.id).subscribe(result => {
      console.log(result);
    })
  }
}
