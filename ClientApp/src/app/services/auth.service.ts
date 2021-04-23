import { Injectable , Inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static loggedIn: boolean = false;
  static email: string = "one@mail.com";
  _baseUrl: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  isUserLoggedIn() {
    return AuthService.loggedIn;
  }

  signUp(body) {
    return this.http.post<any>(this._baseUrl + 'api/data/signup', body);
  }

  signIn(body) {
    return this.http.post<any>(this._baseUrl + 'api/data/signin', body);
  }

  setEmail(email: string) {
    AuthService.email = email;
    AuthService.loggedIn = true;
    localStorage.setItem('loggedIn', "true");
  }

  logout(): void {
    AuthService.email = '';
    localStorage.removeItem("loggedIn");

  }

  getEmail() {
    return of(AuthService.email);
  }
}
