import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  loading;

  constructor(
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
   }

  async handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if(error && error.error && error.error.message){
        errorMessage = `${error.error.message}`;
      }else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
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


}
