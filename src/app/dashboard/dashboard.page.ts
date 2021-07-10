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
  comportamiento;
  evaluador;
  usuario_evaluador;
  from;
  end = new Date().toISOString();
  matrices = [];
  sucursales = [];
  agencias = [];
  comportamientos = [];
  drillDown;

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
      if (this.comportamiento) {
        this.filterUrl = this.filterUrl + 'comportamiento=' + this.comportamiento + "&"
      }
      if (this.sucursal) {
        this.filterUrl = this.filterUrl + 'sucursal=' + this.sucursal + "&"
      }
      if (this.agencia) {
        this.filterUrl = this.filterUrl + 'agencia=' + this.agencia + "&"
      }
      if (this.drillDown) {
        this.filterUrl = this.filterUrl + 'drillDown=' + this.drillDown + "&"
      }
      if (this.evaluador) {
        this.filterUrl = this.filterUrl + 'usuario_evaluador=' + this.usuario_evaluador + "&"
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
    if (this.show) {
      this.getData();
    }
  }

  filtroComportamiento(comportamientoId, sucursalId = null, agenciaId = null, evaluadorId = null) {
    this.comportamiento = comportamientoId;
    if (!this.drillDown) {
      this.drillDown = 'sucursal'
    } else if (this.drillDown == 'sucursal') {
      this.drillDown = 'agencia';
    } else if (this.drillDown == 'agencia') {
      this.drillDown = 'evaluador';
    } else if (this.drillDown == 'evaluador') {
      this.drillDown = 'evaluado';
    } else {
      return;
    }
    if (sucursalId) {
      this.sucursal = sucursalId;
    } else if (agenciaId) {
      this.agencia = agenciaId;
    } else if (evaluadorId) {
      this.evaluador = evaluadorId;
      this.usuario_evaluador = evaluadorId;
      this.getData();
    } else
      this.getData();
  }

  reset() {
    this.show = false;
    this.drillDown = "";
    this.matriz = "";
    this.sucursal = "";
    this.agencia = "";
    this.comportamiento = "";
    this.from = "";
    this.evaluador = "";
    this.end = new Date().toISOString();
    let end = new Date();
    end.setMonth(end.getMonth() - 1);
    this.from = end.toISOString();
    this.getData();
  }

  getColor(value) {
    const color = this.util.getColor(value);
    return `linear-gradient(90deg, ${color} 2%, transparent 2%)`;
  }
}
