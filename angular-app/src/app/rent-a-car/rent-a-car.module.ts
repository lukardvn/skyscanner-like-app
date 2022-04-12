import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllCarsComponent } from './all-cars/all-cars.component';
import { CarComponent } from './car/car.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AllCarsComponent,
    CarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    AllCarsComponent,
    CarComponent
  ]
})
export class RentACarModule { }
