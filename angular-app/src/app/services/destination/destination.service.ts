import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {
  //baseUrl = "https://localhost:44383/Destination";
  baseUrl = env.localUrl + '/Destination';
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetAll`);
  }

  getMore(airlineId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${airlineId}/GetMore`);
  }

  addDestinationToAirline(){
    
  }
}
