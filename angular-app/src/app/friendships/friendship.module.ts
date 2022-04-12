import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendsModalComponent } from './friends-module/friends-module.component';
import { ListFriendsComponent } from './list-friends/list-friends.component';
import { ReceivedRequestsComponent } from './received-requests/received-requests.component';
import { SentRequestsComponent } from './sent-requests/sent-requests.component';
import { ReservationsModalComponent } from './reservations-module/reservations-module.component';

@NgModule({
  declarations: [
    FriendsModalComponent,
    ListFriendsComponent,
    ReceivedRequestsComponent,
    SentRequestsComponent,
    ReservationsModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FriendsModalComponent,
    ListFriendsComponent,
    ReceivedRequestsComponent,
    SentRequestsComponent,
    ReservationsModalComponent
  ],
  entryComponents: [
    FriendsModalComponent,
    ReservationsModalComponent
  ]
})
export class FriendshipModule { }
