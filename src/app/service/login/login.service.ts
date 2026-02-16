import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http'

const AUTH_API = 'http://localhost:8080/auth/';
  const baseUrl ='http://localhost:8080/hms/api/doctor/signup';

  const base_url_auth =  'http://localhost:8080/auth/reset'

const baseUrlUserMe = 'http://localhost:8080/auth/search'

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogin: boolean;

  constructor(private http: HttpClient) {}

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


  getAllUsers(): Observable<any> {
    return this.http.get(AUTH_API +'all');
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(base_url_auth, data,
            { responseType: 'text' }
    );
  }


// Search by username
searchUsers(username: string): Observable<any> {
  return this.http.get<any>(`${baseUrlUserMe}`, { params: { username } }); }



register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role // ROLE_USER, ROLE_ADMIN, ROLE_DOCTOR
    }, httpOptions);
  }


}
