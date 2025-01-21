import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Credentials, User } from '../interfaces/user';
import { LoggedInUser } from '../interfaces/user';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

// const HOUSE_SPIFFING_URL = 'http://localhost:8080/swagger-ui/index.html';
const CHORES_URL = 'http://localhost:8080/api/chores';
const CATEGORIES_URL = 'http://localhost:8080/api/categories';

const API_URL=`${environment.apiURL}/api`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http: HttpClient = inject(HttpClient);
  router = inject(Router);

  user = signal<LoggedInUser | null>(null)

  constructor(){
    const token = localStorage.getItem("token")
    if (token) {

      const decodedTokenSubject = jwtDecode(token)
          .sub as unknown as LoggedInUser
          console.log(decodedTokenSubject);
        this.user.set({
          fullname: decodedTokenSubject.fullname,
          username: decodedTokenSubject.username
        })
    }
    effect(() => {
      if (this.user()){
        console.log("User logged in: ", this.user()?.fullname);
      } else {
        console.log("No user logged in");
      }
    })
  }

  getChore() {
    return this.http.get(CHORES_URL, {
      headers: {
        Accept: 'application/json'
      }
    })
  }

  getCategory() {
    return this.http.get(CATEGORIES_URL, {
      headers: {
        Accept: 'application/json'
      }
    })
  }

  registerUser(user : User) {
    return this.http.post<{msg:string}>(`${API_URL}/users/save`, user)
  }

  check_duplicate_email(username: string) {
    return this.http.get(`${API_URL}/check_duplicate_email/${username}`)
  }

  loginUser(credentials: Credentials) {
    return this.http.post<{token: string}>(`${API_URL}/auth/authenticate`, credentials)
  }

  logoutUser() {
    this.user.set(null);
    localStorage.removeItem("token");
    this.router.navigate(['user-login'])
  }
}
