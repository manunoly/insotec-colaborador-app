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
  evaluacion = {};
  cantidadEvaluacion = [];

  constructor(private alertController: AlertController, private _navigation: Location, private api: ApiService, private router: Router, private util: UtilService) { }

  ngOnInit() {
    this.colaborador = this.util.getTmpData();
    if(!this.colaborador){
      this.util.showMessage('No hemos identificado el trabajador a evaluar');
      return this._navigation.back();
    }
    //console.log('this.colaborador',this.colaborador);
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

  async confirmaEvaluacion() {
    {
      const alert = await this.alertController.create({
        header: 'Guardar evaluación!',
        message: `Esta a punto de registar una nueva evaluación`,
        cssClass: 'alertDefault',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: (data) => {

            }
          }, {
            text: 'Guardar',
            handler: () => {
              this.salvarEvaluacion();
            }
          }
        ]
      });

      await alert.present();
    }
  }

  async salvarEvaluacion(){
    let postData = {
      'user_id': this.colaborador?.id,
      'matriz_id': this.colaborador?.matriz_id,
      'comportamientos': JSON.stringify(this.evaluacion)
    }
    // for (const [key, value] of Object.entries(this.evaluacion)) {
    //   postData[`eval${index}_id`] = parseInt(key.toString().trim());
    //   postData[`eval${index}`] = parseInt(value.toString().trim());
    //   index = index + 1;
    // }
    try {
      await this.util.showLoading();
      //console.log('postData', postData);
      const resp = await this.api.post('evaluaciones', postData);
      this.util.dismissLoading();
      if (resp && resp?.id){
        this.util.showMessage('Por favor terminar evaluación, se ha guardado las calificaciones');
        this.router.navigateByUrl('/evaluaciones-ultimas/' + resp.id + '/'+ this.colaborador?.id );
      }
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

  async verComportamientoDetalle(id){
    //console.log(id,this.data);
    const modal = await this.util.modalComportamiento(id, this.data);
    modal.onWillDismiss().then(resp=> {
      if(resp?.data && resp?.data.hasOwnProperty('comportamientoValue')){
        this.evaluacion[`id${id}`] = resp?.data?.comportamientoValue;
        if(!this.cantidadEvaluacion.includes(id)){
          this.cantidadEvaluacion.push(id);
        }
        //console.log('this.evaluacion',JSON.stringify(this.evaluacion));
      }
    }).catch();
  }
}
