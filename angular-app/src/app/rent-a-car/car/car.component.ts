import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/rent-a-car/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  car: any = {};

  constructor(private carService: CarService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');  //id "trenutnog" korisnika, cita se iz urla: /edit-profile/X 

    this.carService.getUserById(+id).subscribe(result => {
      this.car = result;
    }, err => {console.log(err)});
  }

}
