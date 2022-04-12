import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, mergeMap } from 'rxjs/operators';

@Injectable()
export class Auth0Interceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> { 
    //zahtevi za koje nije potrebno dodati Bearer token u zaglavlje
    /*if (request.url.startsWith('https://localhost:44375/to-do-lists/share/')){
      return next.handle(request)
    }*/

    if (request.url.match('https://localhost:44383/Airline/All') ||
        /*request.url.match('https://localhost:44383/Airline/[0-9]*') ||*/
        request.url.match('https://localhost:44323/Car') /*||
        request.url.startsWith('https://localhost:44383/Airline/')*/){
      return next.handle(request);
    }

    return this.auth.getAccessTokenSilently().pipe(
      mergeMap(token => {
        const tokenReq = request.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        });
        return next.handle(tokenReq);
      }),
      catchError(err => throwError(err))
    );
  }
}