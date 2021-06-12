import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { UtilService } from '../services/util.service';
import { EvaluadoIterface } from './../services/interfaces';

@Component({
  selector: 'app-evaluados',
  templateUrl: './evaluados.page.html',
  styleUrls: ['./evaluados.page.scss'],
})
export class EvaluadosPage implements OnInit {
  userData: EvaluadoIterface;
  originalData: EvaluadoIterface;

  constructor(private api:ApiService, private util: UtilService) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    try {
      await this.util.showLoading();
      const response = await this.api.getData('evaluados');
      this.userData = response as any;
      this.originalData = this.userData;
      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }
}
