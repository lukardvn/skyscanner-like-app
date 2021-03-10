import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  baseUrl = env.localCarUrl;
  carRoute = "/Car";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.carRoute}/GetAll`);
  }

  getUserById(id: number) : Observable<any> {
    return this.http.get<any>(`${this.baseUrl}${this.carRoute}/${id}`);
  }

  deleteCar(id) {
    return this.http.delete<any>(`${this.baseUrl}${this.carRoute}/${id}`);
  }
}
