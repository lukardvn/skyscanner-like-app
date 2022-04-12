import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { UserService } from 'src/app/services/user/user.service';
import { UserAirlineDto } from 'src/models/UserAirlineDto';

@Component({
  selector: 'app-airline-admins-add',
  templateUrl: './airline-admins-add.component.html',
  styleUrls: ['./airline-admins-add.component.css']
})
export class AirlineAdminsAddComponent implements OnInit {
  users;

  constructor(private userService: UserService,
              private airlineService: AirlineService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(result => {
      this.users = [...result.data];
    })
  }

  makeAdmin(user) {
    let userAirline: UserAirlineDto = {
      UserId: user.id,
      AirlineId: this.data.id
    };

    this.airlineService.makeUserAnAdmin(userAirline).subscribe(result => {
      console.log(result);
    })
  }
}
