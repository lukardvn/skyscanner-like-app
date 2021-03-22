import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlightService } from 'src/app/services/flight/flight.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-airline-flights-edit',
  templateUrl: './airline-flights-edit.component.html',
  styleUrls: ['./airline-flights-edit.component.css']
})
export class AirlineFlightsEditComponent implements OnInit {
  changed;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private flightService: FlightService,
              public dialogRef: MatDialogRef<AirlineFlightsEditComponent>,
              private router: Router,
              public authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.data);
  }


  toggleDiscount(flight){
    this.flightService.toggleDicount(flight).subscribe((result:any) => {
      this.dialogRef.close("toggled!");
      this.router.navigateByUrl("/home");
    })
  }
}
