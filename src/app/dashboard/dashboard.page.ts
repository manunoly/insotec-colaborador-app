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
  show = false;

  filterUrl = "";
  matriz;
  sucursal;
  agencia;
  from;
  end = new Date().toISOString();
  cons
  matrices = [];
  sucursales = [];
  agencias = [];

  constructor(private util: UtilService, private api: ApiService) { }

  ngOnInit() {
    let end = new Date();
    end.setMonth(end.getMonth() - 1);
    this.from = end.toISOString();
    this.api.getData('matrices').then(data => this.matrices = data as any);
    this.api.getData('sucursales').then(data => this.sucursales = data as any);
    this.api.getData('agencias').then(data => this.agencias = data as any);

    this.getData();
  }

  async getData() {
    try {
      await this.util.showLoading();
      this.filterUrl = "?"
      if (this.matriz) {
        this.filterUrl = this.filterUrl + 'matriz=' + this.matriz + "&"
      }
      if (this.sucursal) {
        this.filterUrl = this.filterUrl + 'sucursal=' + this.sucursal + "&"
      }
      if (this.from) {
        this.filterUrl = this.filterUrl + 'from=' + this.from.toString().slice(0, 10) + "&"
      }
      if (this.end) {
        this.filterUrl = this.filterUrl + 'end=' + this.end.toString().slice(0, 10);
      }
      const response = await this.api.getData('evaluacionesfilter' + this.filterUrl);
      this.data = response as any;

      await this.util.dismissLoading();
      this.show = true;
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

  async filter() {
    if(this.show){
      this.getData();
    }
  }
}
