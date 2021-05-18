import { EvaluadoIterface } from './../services/interfaces';
import { UtilService } from './../services/util.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.page.html',
  styleUrls: ['./evaluar.page.scss'],
})
export class EvaluarPage implements OnInit {
  evaluados: EvaluadoIterface;

  constructor(private auth:AuthService, private util: UtilService) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    try {
      await this.util.showLoading();
      const response = await this.auth.getUserFromServer();
      this.evaluados = response['evaluados'];
      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }
}
