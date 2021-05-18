import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const ACCESS_TOKEN_KEY = 'my-access-token';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  currentAccessToken = null;
  url = environment.api;

  constructor(private http: HttpClient, private router: Router) { }

  getHeader() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.currentAccessToken}`
      })
    }
  }

  setHeader(token: string){
    this.currentAccessToken = token;
  }

  async getUser(){
    try {
      return await this.http.get(`${this.url}/user`, this.getHeader());
    } catch (error) {

    }
  }
   // Create new user
   signUp(credentials: {username, password}): Promise<any> {
    return this.http.post(`${this.url}/users`, credentials).toPromise();
  }

}
