import { Component, OnInit, Inject } from '@angular/core';
import { DestinationService } from 'src/app/services/destination/destination.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirlineService } from 'src/app/services/airline/airline.service';

@Component({
  selector: 'app-airline-destinations-add',
  templateUrl: './airline-destinations-add.component.html',
  styleUrls: ['./airline-destinations-add.component.css']
})
export class AirlineDestinationsAddComponent implements OnInit {
  destinations;
  selectedDestination: any;
  alreadyContains;;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private destinationService: DestinationService,
              private airlineService: AirlineService) { }

  ngOnInit(): void {
    this.destinationService.getAll().subscribe(result => {
      this.destinations = [...result.data];
    })
  }
  
  addDestination(){
    let airlineDestination = {
      AirlineId: this.data,
      DestinationId: this.selectedDestination.id
    };

    this.airlineService.addDestToAirline(airlineDestination).subscribe((result: any) => {
      if (result.success === false)
        this.alreadyContains = true;
      else
        this.alreadyContains = false;

    }, err => {
      console.log(err);
    })
  }

}
