import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {
  //baseUrl = "https://localhost:44383/Friendship";
  baseUrl = env.localUrl + '/Friendship';
  headers = { 'content-type': 'application/json' }
  myFriend;

  constructor(private http: HttpClient) { }

  getFriends(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetMyFriends`);
  }

  getUsersFriends(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/GetMyFriends/${id}`);
  }

  getRequestsReceived(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/RequestsReceived`);
  }

  getRequestsSent(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/RequestsSent`);
  }

  respondToRequest(response: any) {
    const body = JSON.stringify(response);
    return this.http.put(`${this.baseUrl}/RespondToRequest`, body, { 'headers': this.headers });
  }

  cancelRequest(id) {
    return this.http.delete(`${this.baseUrl}/CancelRequest/${id}`);
  }
  
  addFriend(request) {
    const body = JSON.stringify(request);
    return this.http.post(`${this.baseUrl}`, body, { 'headers': this.headers });
  }

  checkIfFriend(id) {
    return this.http.get<any>(`${this.baseUrl}/CheckIfFriend/${id}`);
  }

}