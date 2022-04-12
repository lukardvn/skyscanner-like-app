import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirlineDestinationsEditComponent } from './airline-destinations-edit/airline-destinations-edit.component';
import { AirlineDetailComponent } from './airline-detail/airline-detail.component';
import { AirlineEditComponent } from './airline-edit/airline-edit.component';
import { AirlineFlightsEditComponent } from './airline-flights-edit/airline-flights-edit.component';
import { AirlineMapComponent } from './airline-map/airline-map.component';
import { AllAirlinesComponent } from './all-airlines/all-airlines.component';
import { QuickReservationsComponent } from './quick-reservations/quick-reservations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { AirlineDestinationsAddComponent } from './airline-destinations-add/airline-destinations-add.component';
import { AirlineAdminsComponent } from './airline-admins/airline-admins.component';
import { AirlineAdminsAddComponent } from './airline-admins-add/airline-admins-add.component';

@NgModule({
  declarations: [
    AirlineDestinationsEditComponent,
    AirlineDetailComponent,
    AirlineEditComponent,
    AirlineFlightsEditComponent,
    AirlineMapComponent,
    AllAirlinesComponent,
    QuickReservationsComponent,
    AirlineDestinationsAddComponent,
    AirlineDestinationsAddComponent,
    AirlineAdminsComponent,
    AirlineAdminsAddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  exports: [
    AirlineDestinationsEditComponent,
    AirlineDetailComponent,
    AirlineEditComponent,
    AirlineFlightsEditComponent,
    AirlineMapComponent,
    AllAirlinesComponent,
    QuickReservationsComponent,
    AirlineDestinationsAddComponent
  ],
  entryComponents: [
    AirlineDestinationsEditComponent,
    AirlineFlightsEditComponent,
    AirlineMapComponent,
    QuickReservationsComponent,
    AirlineDestinationsAddComponent,
    AirlineAdminsAddComponent
  ]
})
export class AirlineModule { }
