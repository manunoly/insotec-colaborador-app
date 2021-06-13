import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserIterface } from './interfaces';

const { Storage } = Plugins;

const TOKEN_KEY = 'user-token';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUser: BehaviorSubject<UserIterface|null|false> = new BehaviorSubject(null);
  url = environment.api;
  user:UserIterface;

  constructor(private router: Router, private api: ApiService, private http: HttpClient) {
    this.loadUser();
  }

  loadUser() {
    Storage.get({ key: TOKEN_KEY }).then(res => {
      console.log('loadUser SET USER: ', JSON.parse(res.value));

      if (res.value) {
        const userData = JSON.parse(res.value);
        this.currentUser.next(userData);
        this.api.setHeader(userData['token']);
        this.router.navigateByUrl('/inicio', { replaceUrl: true });
      } else {
        this.currentUser.next(false);
        this.api.setHeader('');
      }
    });
  }

  login(data):Promise<any> {
    return new Promise(async (resolve, reject) => {
        this.http.post(`${this.url}/login`, data).toPromise().then(userData =>{
          Storage.set({ key: TOKEN_KEY, value: JSON.stringify(userData) });
          this.currentUser.next(userData['user']);
          this.api.setHeader(userData['token']);
          resolve(userData['user']);
        }).catch(err=> reject(err));
    });
  }

  getUser() {
    return this.currentUser.asObservable();
  }

  getUserFromServer(){
    return this.http.get(`${this.url}/user`, this.api.getHeader()).toPromise();
  }

  async logout() {
    await Storage.remove({ key: TOKEN_KEY });
    this.currentUser.next(false);
    this.api.setHeader('');
    this.http.post(`${this.url}/logout`, {}, this.api.getHeader()).toPromise().then().catch()
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  hasRole(role: string): boolean {
      if (!this.currentUser.value || !this.currentUser.value.roles.includes(role as any)) {
        return false;
      }
    return true;
  }

}
