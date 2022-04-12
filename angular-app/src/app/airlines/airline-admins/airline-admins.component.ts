import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AirlineService } from 'src/app/services/airline/airline.service';
import { AirlineAdminsAddComponent } from '../airline-admins-add/airline-admins-add.component';

@Component({
  selector: 'app-airline-admins',
  templateUrl: './airline-admins.component.html',
  styleUrls: ['./airline-admins.component.css']
})
export class AirlineAdminsComponent implements OnInit {
  airlines;

  constructor(private airlineService: AirlineService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.airlineService.getAll().subscribe(result => {
      this.airlines = [...result.data];
    }, err => {
      console.log(err);
    });
  }

  showAirlineAdminsModal(airline) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "70%";
    dialogConfig.data = airline;
    dialogConfig.position = { top: '10%' };

    this.dialog.open(AirlineAdminsAddComponent, dialogConfig);
  }
}
