import { LeyendaColoresComponent } from './../share/leyenda-colores/leyenda-colores.component';
import { ApiService } from './../services/api.service';
import { UtilService } from './../services/util.service';
import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  data;
  order = 'comportamiento';
  sortAsc = true;
  customPopoverOptions: any = {
    //header: 'Hair Color',
    subHeader: 'Seleccione una opción',
    translucent: true
    //message: 'Only select your dominant hair color'
  };
  show = false;

  filterUrl = "";
  matriz = '';
  sucursal = '';
  agencia = '';
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

  constructor(private util: UtilService, private api: ApiService,public popoverController: PopoverController, private auth: AuthService) { }

  ngOnInit() {
    let end = new Date();
    end.setMonth(end.getMonth() - 1);
    this.from = end.toISOString();
    this.api.getData('matrices')
      .then(data => {
        this.matrices = data as any
      }).catch();

    this.api.getData('sucursales')
      .then(data => {
        if(this.auth.tienePermiso('gerenteagencia') || this.auth.tienePermiso('gerentesucursal')){
            this.sucursal = data[0] && data[0]['id'] ? data[0]['id'].toString() : '';
        }
        this.sucursales = data as any;
        if(this.sucursales && this.sucursales.length > 1){
          this.sucursal = '*';
          this.sucursales.unshift({id: '*', nombre: 'Todas'})
        }
      }).catch();

    this.api.getData('agencias').then(data => {
      if(this.auth.tienePermiso('gerenteagencia')){
        this.agencia =  data[0] && data[0]['id'] ? data[0]['id'].toString() : '';
      }
      this.agencias = data as any
      if(this.agencias && this.agencias.length > 1){
        this.agencia = '*';
        this.agencias.unshift({id: '*', nombre: 'Todas'})
      }
    }).catch();

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
      if (this.sucursal && this.sucursal != '*') {
        this.filterUrl = this.filterUrl + 'sucursal=' + this.sucursal + "&"
      }
      if (this.agencia && this.agencia != '*') {
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

  showMatrizName(position:number):boolean {
    if(position == 0 || this.data[position]['matriz_nombre'] != this.data[position - 1]['matriz_nombre']){
      return true;
    }
    return false;
  }

  convertAndSortData(field, sortAsc){
    this.sortAsc = sortAsc;
    this.order = field;
    this.data.sort((a,b)=> sortAsc ? (a[field] > b[field] ? 1 : -1) : (a[field] < b[field] ? 1 : -1))
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
    this.sucursal = "*";
    this.agencia = "*";
    this.comportamiento = "";
    this.from = "";
    this.evaluador = "";
    this.end = new Date().toISOString();
    let end = new Date();
    end.setMonth(end.getMonth() - 1);
    this.from = end.toISOString();
    this.getData();
    this.order = 'comportamiento';
    this.sortAsc = true;
  }

  getColor(value) {
    const color = this.util.getColor(value);
    return `linear-gradient(90deg, ${color} 2%, transparent 2%)`;
  }

  async coloresHelp(ev){
    const popover = await this.popoverController.create({
      component: LeyendaColoresComponent,
      cssClass: '',
      event: ev,
      translucent: true
    });
    await popover.present();
  }
}
