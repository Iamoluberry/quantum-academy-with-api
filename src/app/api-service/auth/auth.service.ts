import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiLoginUrl = 'http://127.0.0.1:8000/api/login';
  private apiLogoutUrl = 'http://127.0.0.1:8000/api/logout';

  constructor(private http: HttpClient) { }

  login(data: {email: string, password: string}): Observable<any>{
    return this.http.post(this.apiLoginUrl, data);
  }

  //to store generate token
  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  //to be used in authguard
  hasToken(){

    if (localStorage.getItem('authToken')) {
      return true;
    }

    return false;
  }

  // get the current authToken
  getToken(): string | null{
    return localStorage.getItem('authToken');
  }

  // Logout and remove token
  logout(): Observable<any> {
    return this.http.get(this.apiLogoutUrl);
  }

  getUserRole(): Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/role');
  }

}
