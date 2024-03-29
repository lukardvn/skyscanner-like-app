import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Airline } from 'src/models/Airline';
import { environment as env } from '../../../environments/environment';
import { UserAirlineDto } from 'src/models/UserAirlineDto';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  //baseUrl = "https://localhost:44383/Airline";
  baseUrl = env.localUrl + '/Airline';
  headers = { 'content-type': 'application/json' }
  availableAirlineDestinations;

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/All`);
  }

  getMine(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/MyAirline`);
  }

  addDestToAirline(request) {
    const body = JSON.stringify(request);
    return this.http.post(`${this.baseUrl}/AddDestination`, body, { 'headers': this.headers });
  }

  updateSingle(airline: Airline) { 
    const body = JSON.stringify(airline);
    return this.http.put<any>(`${this.baseUrl}`, body, {'headers': this.headers});
  }

  getSingle(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  makeUserAnAdmin(userAirline: UserAirlineDto){
    const body = JSON.stringify(userAirline);
    return this.http.put<any>(`${this.baseUrl}/MakeAdmin`, body, {'headers': this.headers});
  }
}
