import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';
import { UtilService } from './../services/util.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-evaluar',
  templateUrl: './evaluar.page.html',
  styleUrls: ['./evaluar.page.scss'],
})
export class EvaluarPage implements OnInit {
  data;
  colaborador;
  today = Date.now();
  evaluacion = {

  }
  constructor(private alertController: AlertController, private _navigation: Location, private api: ApiService, private router: Router, private util: UtilService) { }

  ngOnInit() {
    this.colaborador = this.util.getTmpData();
    if(!this.colaborador){
      this.util.showMessage('No hemos identificado el trabajador a evaluar');
      return this._navigation.back();
    }
    this.getData(this.colaborador?.matriz_id);
  }

  async getData(id) {
    try {
      await this.util.showLoading();
      const response = await this.api.getData(`matrices/${id}`);
      this.data = response as any;
      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

  verComportamientoDetalle(id) {
    this.util.modalComportamiento(id, this.data, false);
  }

  async confirmaEvaluacion() {
    {
      const alert = await this.alertController.create({
        header: 'Nuevo Usuario!',
        message: `Te gustaria Registrarte`,
        cssClass: 'fondoVerde alertDefault',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: (data) => {

            }
          }, {
            text: 'Enviar',
            handler: () => {
              this.util.setTmpData('');
            }
          }
        ]
      });

      await alert.present();
    }
  }
}
