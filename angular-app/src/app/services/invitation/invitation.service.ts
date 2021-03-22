import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitation } from 'src/models/Invitation';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private baseUrl = env.localUrl + '/invitations';
  headers = { 'content-type': 'application/json' }

  public invitation;

  constructor(private http: HttpClient) { }
 
  createInvitation(invitation: Invitation): Observable<any> {
    const body = JSON.stringify(invitation);
    return this.http.post(`${this.baseUrl}`, body, { 'headers': this.headers });
  }

  getInvitations(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  getInvitation(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  deleteInvitation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  freeSeat(seat: any): Observable<any> {
    const body = JSON.stringify(seat);
    return this.http.put<any>(`${this.baseUrl}/FreeSeat`, body, {'headers': this.headers});
  }

  takeSeat(seat: any): Observable<any> {
    const body = JSON.stringify(seat);
    return this.http.put<any>(`${this.baseUrl}/TakeSeat`, body, {'headers': this.headers});
  }

  holdSeat(seat: any): Observable<any> {
    const body = JSON.stringify(seat);
    return this.http.put<any>(`${this.baseUrl}/HoldSeat`, body, {'headers': this.headers});
  }
}
