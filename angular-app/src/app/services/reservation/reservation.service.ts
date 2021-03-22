import { ReservationDto } from './../../../models/ReservationDto';
import { Flight } from 'src/models/Flight';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  //private baseUrl = "https://localhost:44383/Reservations";
  private baseUrl = env.localUrl + '/Reservations';
  headers = { 'content-type': 'application/json' }

  public selectedDepartingFlight: any = null; // PROMENIO sa Flight na any
  public selectedReturningFlight: any = null;
  public departingFlightSeat: any; //promennjeno sa number
  public returningFlightSeat: any;

  constructor(private http: HttpClient) { }

  getReservations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetAll`);
  }

  addReservation(reservation: ReservationDto): Observable<any> {
    const body = JSON.stringify(reservation);
    return this.http.post(`${this.baseUrl}/AddReservation`, body, { 'headers': this.headers });
  }
  
  addReservationQuick(reservation: ReservationDto): Observable<any> {
    const body = JSON.stringify(reservation);
    return this.http.post(`${this.baseUrl}/AddReservationQuick`, body, { 'headers': this.headers });
  }

  updateSeat(seat: any): Observable<any> {
    const body = JSON.stringify(seat);
    return this.http.put<any>(`${this.baseUrl}/UpdateSeat`, body, {'headers': this.headers});
  }

  getSingle(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  cancelReservation(reservationId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/CancelReservation/${reservationId}`);
  }

}
