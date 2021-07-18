import { ModalMatrizComportamientoPage } from './../modal-matriz-comportamiento/modal-matriz-comportamiento.page';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  loading;
  tmpData;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    public modalController: ModalController
  ) {
  }

  async handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      //console.log('client-side error');
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //console.log('server-side error');
      // server-side error
      if (error && error.error && error.error.message) {
        errorMessage = `${error.error.message}`;
      } else {
        //errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        errorMessage = `Ha ocurrido un error inesperado Error: ${error.status}\n favor revisar su conexión y vuelva a intentar`;
      }
    }

    const alert = await this.alertController.create({
      header: 'Error',
      message: errorMessage ?? 'Ha ocurrido un error!',
      cssClass: 'modalStyle',
      buttons: ['OK'],
    });
    await alert.present();
    return throwError(errorMessage);
  }

  async modalComportamiento(comportamientoId, matriz, readOnly = true): Promise<HTMLIonModalElement> {
    const modal = await this.modalController.create({
      component: ModalMatrizComportamientoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'comportamientoId': comportamientoId,
        'matriz': matriz,
        'readonly': readOnly
      }
    });
    await modal.present();
    return modal;
  }

  async showLoading(msg = 'Espere') {
    this.loading = await this.loadingController.create({
      message: msg,
      duration: 24000
    });
    setTimeout(() => {
      if (this.loading)
        this.loading.message = `Insotec tu amigo`;
    }, 4000);
    setTimeout(() => {
      if (this.loading)
        this.loading.message = `Insotec tu amigo <br> Gracias por preferirnos <br> Crédito para el desarrollo`;
    }, 8000);
    setTimeout(() => {
      if (this.loading)
        this.loading.message = `Ya mismo terminamos... <br> Gracias por preferirnos`;
    }, 14000);
    await this.loading.present();
  }

  async dismissLoading() {
    try {
      await this.loading.dismiss();
    } catch (error) { }
  }

  setTmpData(data) {
    this.tmpData = data;
  }

  getTmpData() {
    return this.tmpData;
  }

  getColor(valor) {
    let color = "transparent";
    switch (true) {
      case valor < 1:
        return "rgb(255,0,0)";
      case valor < 2:
        return "rgb(255,192,0)";
      case valor < 3:
        return "rgb(255,255,0)";
      case valor < 4.1:
        return "rgb(0,176,80)";
      default:
        return color;
    }
  }

  async presentAlert(messageD, headerD, buttonsD = ['Aceptar'], subHeaderD?, cssClassD = 'notificacionStyle', show = true) {
    let configuracion = { message: messageD, buttons: buttonsD };

    if (headerD)
      configuracion['header'] = headerD;

    if (subHeaderD)
      configuracion['subHeader'] = subHeaderD;

    if (cssClassD)
      configuracion['cssClass'] = cssClassD;

    const alert = await this.alertController.create(configuracion);

    if (show)
      await alert.present();
    else
      return alert;
  }

  async showMessage(msg = '', time = 5000) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      duration: time,
      translucent: true
    });
    toast.present();
  }
}
