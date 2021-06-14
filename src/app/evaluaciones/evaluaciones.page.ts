import { AuthService } from './../services/auth.service';
import { UtilService } from './../services/util.service';
import { ApiService } from './../services/api.service';
import { EvaluacionInterface } from './../services/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluaciones',
  templateUrl: './evaluaciones.page.html',
  styleUrls: ['./evaluaciones.page.scss'],
})
export class EvaluacionesPage implements OnInit {
  public data;
  public dataOriginal: EvaluacionInterface[];
  matriz = [];
  tmpMatriz;
  resume;

  constructor(private util: UtilService, private api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  convertAndSortData(){
    this.data = this.dataOriginal.map(evaluacion => {
        if(!this.matriz.includes(evaluacion?.matriz?.nombre)){
          this.matriz.push(evaluacion?.matriz?.nombre);
      }
      return evaluacion;
    })
  }

  async getData(){
    try {
      await this.util.showLoading();
      this.api.getData('evaluaciones/resumen/usuario').then(resp=>this.resume=resp).catch();
      const response = await this.api.getData('evaluaciones');
      this.dataOriginal = response as any;
      this.convertAndSortData();
      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

}
