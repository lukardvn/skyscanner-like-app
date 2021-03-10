import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: any;

  constructor(private friendshipService: FriendshipService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
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

    //ovde bi trebalo da post-ujem Invitation objekat koji sadrzi polja napravljene rezervacije kao i polje User kome saljemo pozivnicu
    //Reservation objekat treba da izvucem iz prethodne stranice: reservation-summary
    // { DepartingFlight, ReturningFlight, UserId(moj id) }
  }
}
