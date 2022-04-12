import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { PastReservationsComponent } from './past-reservations/past-reservations.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';
import { ReservationSummaryComponent } from './reservation-summary/reservation-summary.component';
import { SuccessComponent } from './success/success.component';
import { RouterModule } from '@angular/router';
import { FlightModule } from '../flights/flight.module';



@NgModule({
  declarations: [
    ListReservationsComponent,
    PastReservationsComponent,
    ReservationDetailComponent,
    ReservationSummaryComponent,
    SuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FlightModule //nzmmm
  ],
  exports: [
    ListReservationsComponent,
    PastReservationsComponent,
    ReservationDetailComponent,
    ReservationSummaryComponent,
    SuccessComponent
  ]
})
export class ReservationModule { }
