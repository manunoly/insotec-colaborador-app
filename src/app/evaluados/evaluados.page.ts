import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { AuthService } from './../services/auth.service';
import { EvaluadoIterface } from './../services/interfaces';

@Component({
  selector: 'app-evaluados',
  templateUrl: './evaluados.page.html',
  styleUrls: ['./evaluados.page.scss'],
})
export class EvaluadosPage implements OnInit {
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
