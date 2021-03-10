import { Component, OnInit } from '@angular/core';
import { flatMap } from 'rxjs/operators';
import { CarService } from 'src/app/services/rent-a-car/car.service';

@Component({
  selector: 'app-all-cars',
  templateUrl: './all-cars.component.html',
  styleUrls: ['./all-cars.component.css']
})
export class AllCarsComponent implements OnInit {
  cars;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.carService.getAll().subscribe(result => {
      this.cars = result;
    }, err => {console.log(err)});
  }

  delete(id){
    //this.carService.deleteCar(id).subscribe();
    this.carService.deleteCar(id).pipe(
      flatMap(() => this.carService.getAll())
    ).subscribe(updatedCars => {
      this.cars = updatedCars;
    });
  }
}
