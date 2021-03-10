import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //baseUrl = "https://localhost:8080";
  baseUrl = env.localUrl;
  authRoute = "/Auth";
  headers = { 'content-type': 'application/json' }

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}${this.authRoute}/Login`, JSON.stringify(credentials), { 'headers': this.headers })
      .pipe(map(response => {
        let result = response as any;
        if (result && result.data){
          localStorage.setItem('token', result.data);
          return true;
        }
        return false;
      }));
  }

  confirmEmail(id: number) {
    const body = JSON.stringify(id);
    return this.http.put(this.baseUrl + this.authRoute + "/Confirm/" + id, body, {'headers': this.headers });
  }

  logout() {  //samo obrisati token iz localStorage-a
    localStorage.removeItem('token');
    this.router.navigateByUrl("/home");
  }

  isLoggedIn() {
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('token');

    if (!token) return false;

    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  get currentUser() {
    let token = localStorage.getItem('token');
    if (!token) return null;

    return new JwtHelperService().decodeToken(token);    
  }

  cachedRequests: Array<HttpRequest<any>> = [];
  
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }
}