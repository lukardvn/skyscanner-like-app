import { SentRequestsComponent } from './../friendships/sent-requests/sent-requests.component';
import { ReceivedRequestsComponent } from './../friendships/received-requests/received-requests.component';
import { ListFriendsComponent } from './../friendships/list-friends/list-friends.component';
import { SuccessComponent } from './../reservations/success/success.component';
import { ReservationSummaryComponent } from './../reservations/reservation-summary/reservation-summary.component';
import { ListReservationsComponent } from './../reservations/list-reservations/list-reservations.component';
import { HomeComponent } from './../accounts/home/home.component';
import { ListReturningFlightsComponent } from './../flights/list-returning-flights/list-returning-flights.component';
import { ListDepartingFlightsComponent } from './../flights/list-departing-flights/list-departing-flights.component';
import { FlightSearchComponent } from './../flights/flight-search/flight-search.component';
import { ListUsersComponent } from './../accounts/list-users/list-users.component';
import { EditProfileComponent } from '../accounts/edit-profile/edit-profile.component';
import { LoginFormComponent } from '../accounts/login-form/login-form.component';
import { SignupFormComponent } from '../accounts/signup-form/signup-form.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth-guard.service';
import { AllAccountsComponent } from '../accounts/all-accounts/all-accounts.component';
import { UserProfileComponent } from '../accounts/user-profile/user-profile.component';
import { AdminAuthGuard } from '../services/auth/admin-auth-guard.service';
import { NoAccessComponent } from '../accounts/no-access/no-access.component';
import { AirlineEditComponent } from '../airlines/airline-edit/airline-edit.component';
import { AllAirlinesComponent } from '../airlines/all-airlines/all-airlines.component';
import { ReservationDetailComponent } from '../reservations/reservation-detail/reservation-detail.component';
import { AnonymousGuard } from '../services/auth/anonymous-guard.service';
import { AirlineMapComponent } from '../airlines/airline-map/airline-map.component';
import { AirlineDetailComponent } from '../airlines/airline-detail/airline-detail.component';
import { CarComponent } from '../rent-a-car/car/car.component';
import { AllCarsComponent } from '../rent-a-car/all-cars/all-cars.component';
import { EmailConfirmedComponent } from '../accounts/email-confirmed/email-confirmed.component';
import { EmailSentComponent } from '../accounts/email-sent/email-sent.component';
import { FriendsComponent } from '../flights/friends/friends.component';
import { ListInvitationsComponent } from '../invitations/list-invitations/list-invitations.component';
import { InvitationDetailComponent } from '../invitations/invitation-detail/invitation-detail.component';
import { DepartingFlightSeatsComponent } from '../flights/departing-flight-seats/departing-flight-seats.component';
import { ReturningFlightSeatsComponent } from '../flights/returning-flight-seats/returning-flight-seats.component';
import { ProfileComponent } from '../auth/profile/profile.component';
import { AuthRedirectComponent } from '../shared/auth-redirect/auth-redirect.component';

import { AuthGuard as Auth0Guard } from '@auth0/auth0-angular';
import { TestComponent } from '../shared/test/test.component';
import { AirlineAdminsComponent } from '../airlines/airline-admins/airline-admins.component';

export const routes: Routes = [
    { path: 'test', component: TestComponent },

    { path: 'auth-redirect', component: AuthRedirectComponent },
    
    { path: 'signup-form', component: SignupFormComponent, canActivate: [AnonymousGuard] },
    { path: 'login-form', component: LoginFormComponent, canActivate: [AnonymousGuard] },
    { path: 'edit-profile/:id', component: EditProfileComponent, canActivate: [Auth0Guard] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [Auth0Guard] },
    //{ path: 'list-users', component: ListUsersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'list-users', component: ListUsersComponent, canActivate: [Auth0Guard] },
    { path: 'home', component: HomeComponent},
    { path: 'no-access', component: NoAccessComponent },
    { path: 'email-sent', component: EmailSentComponent },
    { path: 'confirm/:id', component: EmailConfirmedComponent },
    { path: 'profile', component: ProfileComponent,  canActivate: [Auth0Guard]},

    { path: 'flights' , component: FlightSearchComponent, canActivate: [Auth0Guard]},
    { path: 'departing-flights', component: ListDepartingFlightsComponent, canActivate: [Auth0Guard] },
    { path: 'departing-flight-seats', component: DepartingFlightSeatsComponent },
    { path: 'returning-flights', component: ListReturningFlightsComponent, canActivate: [Auth0Guard] },
    { path: 'returning-flight-seats', component: ReturningFlightSeatsComponent },
    { path: 'reservation/invite-friends', component: FriendsComponent },
    
    //{ path: 'friends/:id/list-reservations', component: FriendReservationsComponent },
    { path: 'list-reservations/:id',  component: ReservationDetailComponent, canActivate: [Auth0Guard] },
    { path: 'list-reservations',  component: ListReservationsComponent, canActivate: [Auth0Guard] },
    { path: 'reservation-summary', component: ReservationSummaryComponent, canActivate: [Auth0Guard]},
    { path: 'reservation-summary/success', component: SuccessComponent, canActivate: [Auth0Guard]},

    //{ path: 'friends/:id/list-friends', component: FriendFriendsComponent},
    { path: 'friends', component: ListFriendsComponent, canActivate: [Auth0Guard] },
    { path: 'friends/requests-received', component: ReceivedRequestsComponent, canActivate: [Auth0Guard] },
    { path: 'friends/requests-sent', component: SentRequestsComponent, canActivate: [Auth0Guard] },

    { path: 'accounts/all', component: AllAccountsComponent },
    { path: 'accounts/profile/:id', component: UserProfileComponent },

    //{ path: 'airlines/my-airline', component: AirlineEditComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    { path: 'airlines/my-airline', component: AirlineEditComponent, canActivate: [Auth0Guard] }, //DODATI I ADMIN AUTH GUARD
    { path: 'airlines/all', component: AllAirlinesComponent},
    { path: 'airline/map', component: AirlineMapComponent },
    { path: 'airlines/:id', component: AirlineDetailComponent },
    { path: 'airlines-admins', component: AirlineAdminsComponent },

    { path: 'cars/all', component: AllCarsComponent },
    { path: 'cars/:id', component: CarComponent },

    { path: 'list-invitations', component: ListInvitationsComponent },
    { path: 'list-invitations/:id', component: InvitationDetailComponent }

];