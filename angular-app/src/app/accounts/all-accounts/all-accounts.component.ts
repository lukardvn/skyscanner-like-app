import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { FriendshipService } from 'src/app/services/friendship/friendship.service';
import { take } from 'rxjs/operators';
import { concat } from 'rxjs';

@Component({
  selector: 'app-all-accounts',
  templateUrl: './all-accounts.component.html',
  styleUrls: ['./all-accounts.component.css']
})
export class AllAccountsComponent implements OnInit {
  users: any;
  //currentId = this.authService.currentUser.nameid; LOKALNA AUTH
  currentId;

  constructor(private userService: UserService,
              private authService: AuthService,
              public auth: Auth0Service) { }

  ngOnInit(): void {
    this.auth.user$.subscribe(result => {
      this.currentId = result['sub'];
      console.log(this.currentId);
    });

    this.userService.getAll().subscribe(result => {
      this.users = [...result.data];
      console.log(this.users);
    }, err => {console.log(err)});
  }
}
