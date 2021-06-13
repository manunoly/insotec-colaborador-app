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
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      if (error && error.error && error.error.message) {
        errorMessage = `${error.error.message}`;
      } else {
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

  async modalComportamiento(comportamiento_id = 1, matriz = {}, readOnly = true) {
    matriz = { "id": 1, "nombre": "Asesor", "evaluaciones_minimo": 5, "activo": 1, "created_at": "2021-05-20T09:47:02.000000Z", "updated_at": "2021-05-20T09:47:05.000000Z", "comportamientos": [{ "id": 1, "matriz_id": 1, "comportamiento": "BIENVENIDA\/SALUDO", "eval0": "SALUDA AL CLIENTE INFORMALMENTE.  NO ESCUCHA SU REQUERIMIENTO Y PASA HABLAR INMEDIATAMENTE DE LAS CONDICIONES Y CARACTERISTICAS DEL CREDITO", "eval1": "SE PRESENTA CON FORMALIDAD Y PASA A HABLAR INMEDIATAMENTE DE LAS CARACTERISTICAS DEL CREDITO ", "eval2": "SE PRESENTA CORDIALMENTE Y PRESENTA EL CREDITO SIN PROFUNDIZAR EN LOS BENEFICIOS", "eval3": "SE MUESTRA TRANQUILO Y AMENO.  SE DIRIGE DE FORMA  RESPETUOSA Y CORDIAL.MEZCLA EL LADO HUMANO DEL CLIENTE CON LA PRESENTACION DEL CREDITO", "activo": 1, "created_at": "2021-05-20T09:49:14.000000Z", "updated_at": "2021-05-20T09:49:18.000000Z" }, { "id": 2, "matriz_id": 1, "comportamiento": "ESCUCHAR Y RECOPILAR LA INFORMACION", "eval0": "CUANDO SE REFIERE AL PRODUCTO", "eval1": "ESCUCHA PARCIALMENTE AL CLIENTE E INTERRUMPE CONTINUAMENTE LAS INAQUIETUDES DEL CLIENTE", "eval2": "PREGUNTA E INDAGA LA NECESIDAD DEL CLIENTE PERO NO RESUELVE SUS INQUIETUDES. ", "eval3": "HACE PREGUNTAS Y VERIFICA EL REQUERIMIENTO Y NECESIDAD DEL CLIENTE.         RESUELVE CLARAMENTE LAS CONSULTAS DE LA OPERACION.                                                          ", "activo": 1, "created_at": "2021-05-20T09:49:14.000000Z", "updated_at": "2021-05-20T09:49:14.000000Z" }, { "id": 3, "matriz_id": 1, "comportamiento": "PRESENTAR DEL PRODUCTO", "eval0": "EL ASESOR PRESENTA EL PRODUCTO SIN PRESTAR ATENCION A LAS FASES DEL CREDITO, LO QUE IMPIDE DETERMINAR LA SOLVENCIA MORAL Y ECONOMICA DEL CLIENTE", "eval1": " LO QUE IMPIDE DETERMINAR LA SOLVENCIA MORAL Y ECONOMICA DEL CLIENTE", "eval2": "EL ASESOR PRESTA ATENCION  A LAS FASES DEL PROCESO DE CREDITO EN CUANTO A LA VOLUNTAD DE PAGO PERO NO A LA CAPACIDAD DE PAGO", "eval3": "EL ASESOR PRESTA MUCHA ATENCION A LAS FASES DEL PROCESO DE CREDITO PARA DETERMINAR Y ASEGURAR QUE LOS CLIENTES POSEAN CAR\u00c1CTER", "activo": 1, "created_at": "2021-05-20T09:49:14.000000Z", "updated_at": "2021-05-20T09:49:14.000000Z" }, { "id": 4, "matriz_id": 1, "comportamiento": "INFORMACION DEL PRODUCTO", "eval0": "EL ASESOR NO IN FORMA AL CLIENTE DE MANERA CLARA EL VALOR DE TASAS, CUOTAS, ASISTENCIAS.  CON SU LENGUAJE CONFUNDE AL CLIENTE.", "eval1": "EL ASESOR INFORMA EL VALOR DE LAS TASAS, CUOTAS Y ASISTENCIAS, SIN EMBARGO NO LOGRA QUE EL CLIENTE ENTIENDA LOS CONCEPTOS.", "eval2": "INFORMA EL VALOR DE TASA, CUOTAS Y ASISTENCIAS DE UNA MANERA BASTANTE BREVE, SIN EMBARGO SU LEGUAJE ES DE FACIL COMPRENSION.", "eval3": "EL ASESOR INFORMA CON EXACTITUD EL VALOR DE LAS TASAS, CUOTAS Y ASISTENCIAS Y COMUNICA DE FORMA CLARA Y PUNTUAL LOS BENEFICIOS Y CARACTERISTICAS, UTILIZANDO UN LENGUAJE DE FACIL COMPRENSION", "activo": 1, "created_at": "2021-05-20T09:49:14.000000Z", "updated_at": "2021-05-20T09:49:14.000000Z" }, { "id": 5, "matriz_id": 1, "comportamiento": "MANEJO DE OBJECIONES", "eval0": "AL ESCUCHAR UNA OBJECION DEL CLIENTE, INTENTA MINIMIZARLA CON UN ARGUMENTO.", "eval1": "ESCUCHA SIN INTERRUMPIR Y APRECIA LA OBJECION DEL CLIENTE", "eval2": "ADEMAS RESPONDE CON UN DIALOGO ALINEADO A LOS BENEFICIOS", "eval3": "ADICIONALMENTE APROVECHA LA OBJECION PARA CONCRETAR EL CIERRE, EN ESA MISMA FECHA", "activo": 1, "created_at": "2021-05-20T09:49:14.000000Z", "updated_at": "2021-05-20T09:49:14.000000Z" }, { "id": 6, "matriz_id": 1, "comportamiento": "DESPEDIDA", "eval0": "NO SE DESPIDE DEL CLIENTE.                   LLAMA AL SIGUIENTE CLIENTE EN PRESENCIA DEL ACTUAL", "eval1": "SE DESPIDE DE UNA FORMA REPETITIVA Y ROB\u00d3TICA                      ", "eval2": "SE DESPIDE  DEL CLIENTE CON UNA SE\u00d1A EN SU CABEZA O MUY INFORMALMENTE                                    ", "eval3": "SE DESPIDE DICIENDO AL CLIENTE: \"QUE TENGA UN BUEN D\u00cdA \/ BUENA TARDE\" CON GESTOS DE CORDIALIDAD EN SU CARA                                    ", "activo": 1, "created_at": "2021-05-20T09:49:14.000000Z", "updated_at": "2021-05-20T09:49:14.000000Z" }] };
    const modal = await this.modalController.create({
      component: ModalMatrizComportamientoPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'firstName': 'Douglas',
        'lastName': 'Adams',
        'middleInitial': 'N'
      }
    });
    return await modal.present();
    return;
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
