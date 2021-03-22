import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { InvitationService } from 'src/app/services/invitation/invitation.service';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
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
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");

    this.invitationService.getInvitation(+id).subscribe(result => {
      this.invitation = result.data;
      console.log(this.invitation);
    });
  }

  acceptInvitation(){
    let reservation = new ReservationDto({ //TREBALO BI DA PROMENIM I STANJE OVIH SEDISTA KAO U CONFIRM RESERVATION
      DepartingFlight: this.invitation.departingFlight,
      ReturningFlight: this.invitation.returningFlight,
      UserId: this.invitation.userReceivingId,
      DepartingFlightSeat: this.invitation.departingFlightSeat,
      ReturningFlightSeat: this.invitation.returningFlightSeat
    });

    // nakon subskrajba na addreservation, treba subskrajb na invitationservice.deleteInvitation
    /*this.toDoListService.updateTodoListPosition(dragged, list.position).pipe(
      flatMap(() => this.toDoListService.getTodoLists())
    ).subscribe(reorderedLists => {
      this.todoLists = reorderedLists;
    })*/

    /*this.reservationService.addReservation(reservation).pipe(
      flatMap(() => this.invitationService.deleteInvitation(this.invitation.id))).subscribe();*/

      this.reservationService.addReservation(reservation).subscribe(result => {  
        if (result.data !== null){
          this.invitationService.takeSeat(result.data.departingFlightSeat).subscribe();
  
          if (result.data.returningFlightSeat !== null){
            this.invitationService.takeSeat(result.data.returningFlightSeat).subscribe();
            this.router.navigateByUrl("/list-reservations");
          }

          this.invitationService.deleteInvitation(this.invitation.id).subscribe();
  
          this.router.navigateByUrl("/list-reservations");     
        }
      })
  }

  rejectInvitation(){ 
    this.invitationService.deleteInvitation(this.invitation.id).subscribe(result => {
      console.log(result); //ovo bi trebalo da je objekat invitacije

      if (result.data !== null){
        this.invitationService.freeSeat(result.data.departingFlightSeat).subscribe();

        if (result.data.returningFlightSeat !== null){
          this.invitationService.freeSeat(result.data.returningFlightSeat).subscribe();
          this.router.navigateByUrl("/list-invitations");
        }

        this.router.navigateByUrl("/list-invitations");     
      }
    })
  }
}
