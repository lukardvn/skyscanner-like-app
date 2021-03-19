import { Component, OnInit } from '@angular/core';
import { InvitationService } from 'src/app/services/invitation/invitation.service';

@Component({
  selector: 'app-list-invitations',
  templateUrl: './list-invitations.component.html',
  styleUrls: ['./list-invitations.component.css']
})
export class ListInvitationsComponent implements OnInit {
  invitations = [];

  constructor(private invitationService: InvitationService) { }

  ngOnInit(): void {
    this.invitationService.getInvitations().subscribe(result => {
      this.invitations = [...result.data];
      console.log(this.invitations);
    }, err=> {
      console.log(err);
    });
  }

}
