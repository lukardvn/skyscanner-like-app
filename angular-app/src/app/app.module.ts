import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';

import { FriendshipService } from './services/friendship/friendship.service';
import { ReservationService } from './services/reservation/reservation.service';
import { AuthService } from './services/auth/auth.service';
import { FlightService } from './services/flight/flight.service';
import { UserService } from './services/user/user.service';
import { InvitationService } from './services/invitation/invitation.service';
import { DestinationService } from './services/destination/destination.service';
import { CarService } from './services/rent-a-car/car.service';
import { AuthGuard } from './services/auth/auth-guard.service';
import { AdminAuthGuard } from './services/auth/admin-auth-guard.service';
import { AnonymousGuard } from './services/auth/anonymous-guard.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { DataTablesModule } from 'angular-datatables';
import { AgmCoreModule } from '@agm/core';
import { GoogleMapsModule } from '@angular/google-maps'
import { ToastrModule } from 'ngx-toastr';

import { environment as env } from '../environments/environment';
import { TokenInterceptor } from './shared/auth/token.interceptor';

import { AuthenticationModule } from './auth/authentication.module';
import { AirlineModule } from './airlines/airline.module';
import { FlightModule } from './flights/flight.module';
import { FriendshipModule } from './friendships/friendship.module';
import { InvitationModule } from './invitations/invitation.module';
import { RentACarModule } from './rent-a-car/rent-a-car.module';
import { ReservationModule } from './reservations/reservation.module';
import { AccountModule } from './accounts/account.module';
import { Auth0Interceptor } from './shared/auth/auth0.interceptor';
import { AuthRedirectComponent } from './shared/auth-redirect/auth-redirect.component';
import { TestComponent } from './shared/test/test.component';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    AuthRedirectComponent,
    TestComponent,
  ],
  exports: [
    MatDialogModule,
    MatTableModule,
    MatSortModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    DataTablesModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyASLJKMtrL7p5SdyDdU-Syvft0gf4stec0'
      apiKey: env.agmApiKey
    }),
    GoogleMapsModule,

    AppRoutingModule,
    AuthenticationModule,
    AirlineModule,
    FlightModule,
    FriendshipModule,
    InvitationModule,
    RentACarModule,
    ReservationModule,
    AccountModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS,
      useClass: Auth0Interceptor, //Auth0Interceptor neka moja CUSTOM ili TokenInterceptor za lokalnu auth
      multi: true
    },
    UserService,
    FlightService,
    AuthService,
    AuthGuard,
    AnonymousGuard,
    AdminAuthGuard,
    ReservationService,
    FriendshipService,
    DestinationService,
    CarService,
    InvitationService
  ],
  bootstrap: [AppComponent],

  //za prikaz modala
  entryComponents: [   
  ]
})
export class AppModule { }


/*
entryComponents: [
  //AddDestinationComponent,
    //FriendsModalComponent,
    //ReservationsModalComponent,
    //NoAccessComponent,
    //AirlineDestinationsEditComponent,
    //AirlineFlightsEditComponent,
    //AddFlightComponent,
    //AirlineMapComponent,
    //QuickReservationsComponent,
    //InvitationDepartingSeatsComponent,
],
declarations [
    //SignupFormComponent,
    //PhoneFormatDirective,
    //LoginFormComponent,
    //EditProfileComponent,
    //ListUsersComponent,
    //FlightSearchComponent,
    //ListDepartingFlightsComponent,
    //ListReturningFlightsComponent,
    //HomeComponent,
    //ListReservationsComponent,
    //ReservationSummaryComponent,
    //SuccessComponent,
    //ListFriendsComponent,
    //FriendsModalComponent,
    //ReservationsModalComponent,
    //ReceivedRequestsComponent,
    //SentRequestsComponent,
    //AllAccountsComponent,
    //UserProfileComponent,
    //NoAccessComponent,
    //AirlineEditComponent,
    //AirlineDestinationsEditComponent,
    //AirlineFlightsEditComponent,
    //AddFlightComponent,
    //AllAirlinesComponent,
    //ReservationDetailComponent,
    //AirlineMapComponent,
    //AirlineDetailComponent,
    //QuickReservationsComponent,
    //PastReservationsComponent,
    //CarComponent,
    //AllCarsComponent,
    //EmailConfirmedComponent,
    //EmailSentComponent,
    //FriendsComponent,
    //ListInvitationsComponent,
    //InvitationDetailComponent,
    //DepartingFlightSeatsComponent,
    //ReturningFlightSeatsComponent,
    //InvitationDepartingSeatsComponent,
    //InvitationReturningSeatsComponent,
]
*/