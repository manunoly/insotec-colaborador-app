import { AuthService } from './../services/auth.service';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit() {
  }

  getData(){
    return;
  }

  logout() {
    this.auth.logout();
  }
}
