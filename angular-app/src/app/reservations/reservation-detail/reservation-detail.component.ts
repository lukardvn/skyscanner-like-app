import { Component, OnInit } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation/reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from 'src/models/Review';
import { User } from 'src/models/User';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FlightService } from 'src/app/services/flight/flight.service';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.css']
})
export class ReservationDetailComponent implements OnInit {
  reservation;
  noTime: boolean = false;
  finished1;
  finished2 = -1;
  review = false;
  review2 = false;

  auth0Id;

  constructor(private reservationService: ReservationService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService,
              private flightService: FlightService,
              private auth: Auth0Service) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.reservationService.getSingle(+id).subscribe(result => {
      this.reservation = result.data;
      this.finished1 = this.compareDate(new Date(), this.reservation.departingFlight.landingTime);
      this.review = this.alreadyLeftReview(this.reservation.departingFlight.reviews);

      if (this.reservation.returningFlight !== null){
        this.finished2 = this.compareDate(new Date(), this.reservation.returningFlight.landingTime);
        this.review2 = this.alreadyLeftReview(this.reservation.returningFlight.reviews);
      }     
    })
  }

  onKey(event) {
    const inputValue = +event.target.value;
    let currentId = +this.authService.currentUser.nameid;
    let review = new Review(currentId, this.reservation.departingFlight.id, inputValue);

    this.flightService.addReview(review).subscribe();
  }

  onKey2(event) {
    const inputValue = +event.target.value;
    let currentId = +this.authService.currentUser.nameid;
    let review = new Review(currentId, this.reservation.returningFlight.id, inputValue);

    this.flightService.addReview(review).subscribe();
  }

  cancelReservation(id) {//ovde poziv servisu za brisanje rezervacije iz baze
    this.reservationService.cancelReservation(id).subscribe(result => {
      console.log("sabskrajb na cancelReservation, objekat je:");
      console.log(result.data);

      if (result.data !== null){
        this.reservationService.updateSeat(result.data.departingFlightSeat).subscribe();
        console.log("sabskrajb na prvu promenu sedista");
        if (result.data.returningFlighSeat !== null){
          this.reservationService.updateSeat(result.data.returningFlightSeat).subscribe();
          console.log("sabskrajb na drugu promenu sedista");
          this.router.navigateByUrl("/list-reservations");
        }

        this.router.navigateByUrl("/list-reservations");     
      }
      else 
        this.noTime = true;
    }, err => {
      console.log(err);
    })
  }

  compareDate(date1: Date, date2: Date): number
  {
    // With Date object we can compare dates them using the >, <, <= or >=.
    // The ==, !=, ===, and !== operators require to use date.getTime(),
    // so we need to create a new instance of Date with 'new Date()'
    let d1 = new Date(date1); let d2 = new Date(date2);

    // Check if the dates are equal
    let same = d1.getTime() === d2.getTime();
    if (same) return 0;

    // Check if the first is greater than second
    if (d1 > d2) return 1;
  
    // Check if the first is less than second
    if (d1 < d2) return -1;
  }

  alreadyLeftReview(reviews){
    this.auth.user$.subscribe(result => {
      this.auth0Id = result['sub'];
    })

    console.log(reviews); //ovde bi trebalo da poredim samo r.user.externalId === auth0Id
    if (reviews.filter(r => r.user.externalId === this.auth0Id).length > 0){
      return true;
    }
    /*let currentId = +this.authService.currentUser.nameid;
    if (reviews.filter(r => r.user.id === currentId).length > 0){
      return true;
    }*/
    else 
      return false;

  }
}
