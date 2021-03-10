import { Flight } from './../../../models/Flight';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  public departingFlights: Flight[];
  public returningFlights: Flight[];
  public invitingFriends: User[]; //kad pritisnem checkbox za invite prijatelja, ovo se puni tim userima

  //private baseUrl = "https://localhost:44383";
  private baseUrl = env.localUrl;
  private flightRoute = "/Flights";
  private headers = { 'content-type': 'application/json' };

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.flightRoute}/GetAll`);
  }
  
  getFiltered(filter: any): Observable<any> {
    const body = JSON.stringify(filter);
    return this.http.post(`${this.baseUrl}${this.flightRoute}/GetFiltered`, body, {'headers': this.headers});
  }

  addFlight(flight: Flight) : Observable<any> {
    const body = JSON.stringify(flight);
    return this.http.post(this.baseUrl + this.flightRoute, body, {'headers': this.headers });
  }

  toggleDicount(flight) {
    const body = JSON.stringify(flight);
    return this.http.put(this.baseUrl + this.flightRoute + '/ToggleDiscount', body, {'headers': this.headers });
  }

  addReview(review) {
    const body = JSON.stringify(review);
    return this.http.post(this.baseUrl + this.flightRoute + '/AddReview', body, {'headers': this.headers });
  }
}
