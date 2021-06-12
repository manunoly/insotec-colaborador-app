import { UserIterface } from './../services/interfaces';
import { UtilService } from './../services/util.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userData:UserIterface;

  constructor(private auth:AuthService, private util: UtilService) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    try {
      await this.util.showLoading();
      const response = await this.auth.getUserFromServer();
      this.userData = response as any;
      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

  logout(){
    this.auth.logout();
  }
}
