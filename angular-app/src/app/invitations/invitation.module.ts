import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitationDetailComponent } from './invitation-detail/invitation-detail.component';
import { ListInvitationsComponent } from './list-invitations/list-invitations.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    InvitationDetailComponent,
    ListInvitationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    InvitationDetailComponent,
    ListInvitationsComponent
  ]
})
export class InvitationModule { }
