import { environment } from './../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserIterface } from './interfaces';

const TOKEN_KEY = 'user-token';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private currentUser: BehaviorSubject<UserIterface|null|false> = new BehaviorSubject(null);
  url = environment.api;
  user:UserIterface;

  constructor(private storage: Storage, private router: Router, private api: ApiService, private http: HttpClient) {
    this.init();
  }

  async init(){
    await this.storage.create();
    this.loadUser();
  }

  private loadUser() {
    this.storage.get('TOKEN_KEY').then(res => {
      const userData = res ?JSON.parse(res) : '';
      console.log('loadUser SET USER: ', userData);
      if (userData) {
        this.currentUser.next(userData['user']);
        this.api.setHeader(userData['token']);
      } else {
        this.currentUser.next(false);
        this.api.setHeader('');
        this.router.navigateByUrl('', { replaceUrl: true });
      }
    });
  }

  login(data):Promise<any> {
    return new Promise(async (resolve, reject) => {
        this.http.post(`${this.url}/login`, data).toPromise().then(userData =>{
          this.storage.set('TOKEN_KEY', JSON.stringify(userData));
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
    this.http.post(`${this.url}/logout`, {}, this.api.getHeader()).toPromise().then().catch()
    this.currentUser.next(false);
    this.api.setHeader('');
    this.storage.remove('TOKEN_KEY');
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  tienePermiso(permision: string): boolean {
      if (!this.currentUser.value || !this.currentUser.value?.permisos?.includes(permision as any)) {
        return false;
      }
    return true;
  }

}
