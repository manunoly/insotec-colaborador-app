import { ApiService } from './../services/api.service';
import { UtilService } from './../services/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  data;
  order = 'name';
  sortAsc = true;
  customPopoverOptions: any = {
    //header: 'Hair Color',
    subHeader: 'Seleccione una opción',
    translucent: true
    //message: 'Only select your dominant hair color'
  };

  filterUrl = "";
  matriz;
  sucursal;
  agencia;
  f_inicio;
  f_fin;

  matrices = [];
  sucursales = [];
  agencias = [];

  constructor(private util: UtilService, private api: ApiService) { }

  ngOnInit() {
    this.getData();
  }

  async getData(){
    try {
      await this.util.showLoading();
      const response = await this.api.getData('evaluacionesfilter' + this.filterUrl);
      this.data = response as any;

      this.api.getData('matrices').then(data => this.matrices = data as any);
      this.api.getData('sucursales').then(data => this.sucursales = data as any);
      this.api.getData('agencias').then(data => this.agencias = data as any);

      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

  async filter(){
    console.log('set filter', this.matriz);
  }
}
