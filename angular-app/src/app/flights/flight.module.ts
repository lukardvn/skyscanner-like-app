import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFlightComponent } from './add-flight/add-flight.component';
import { DepartingFlightSeatsComponent } from './departing-flight-seats/departing-flight-seats.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { FriendsComponent } from './friends/friends.component';
import { InvitationDepartingSeatsComponent } from './invitation-departing-seats/invitation-departing-seats.component';
import { InvitationReturningSeatsComponent } from './invitation-returning-seats/invitation-returning-seats.component';
import { ListDepartingFlightsComponent } from './list-departing-flights/list-departing-flights.component';
import { ListReturningFlightsComponent } from './list-returning-flights/list-returning-flights.component';
import { ReturningFlightSeatsComponent } from './returning-flight-seats/returning-flight-seats.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AddFlightComponent,
    DepartingFlightSeatsComponent,
    FlightSearchComponent,
    FriendsComponent,
    InvitationDepartingSeatsComponent,
    InvitationReturningSeatsComponent,
    ListDepartingFlightsComponent,
    ListReturningFlightsComponent,
    ReturningFlightSeatsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    AddFlightComponent,
    DepartingFlightSeatsComponent,
    FlightSearchComponent,
    FriendsComponent,
    InvitationDepartingSeatsComponent,
    InvitationReturningSeatsComponent,
    ListDepartingFlightsComponent,
    ListReturningFlightsComponent,
    ReturningFlightSeatsComponent
  ],
  entryComponents: [
    AddFlightComponent,
    InvitationDepartingSeatsComponent,
  ]
})
export class FlightModule { }
