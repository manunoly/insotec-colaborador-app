import { Router } from '@angular/router';
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
  public data;
  public dataOriginal;
  matriz = [];
  tmpMatriz;
  order = 'name';
  sortAsc = true;

  constructor(private util: UtilService, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  convertAndSortData(field, sortAsc){
    this.sortAsc = sortAsc;
    this.order = field;
    this.data = this.dataOriginal.map(evaluacion => {
        if(!this.matriz.includes(evaluacion?.matriz?.nombre)){
          this.matriz.push(evaluacion?.matriz?.nombre);
      }

      return evaluacion;
    })
    this.data.sort((a,b)=> sortAsc ? (a[field] > b[field] ? 1 : -1) : (a[field] < b[field] ? 1 : -1))
  }

  async getData(){
    try {
      await this.util.showLoading();
      const response = await this.api.getData('evaluados');
      this.dataOriginal = response as any;
      this.convertAndSortData('name', true);
      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

  setUserEvaluar(evaluar){
    if(!evaluar.matriz_id){
      return this.util.showMessage('El usuario debe tener un cargo asignado');
    }
    this.util.setTmpData(evaluar);
    this.router.navigateByUrl('/evaluar');
  }
}

