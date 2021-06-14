import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { ComportamientoInterface, MatrizIterface } from '../services/interfaces';

@Component({
  selector: 'app-modal-matriz-comportamiento',
  templateUrl: './modal-matriz-comportamiento.page.html',
  styleUrls: ['./modal-matriz-comportamiento.page.scss'],
})
export class ModalMatrizComportamientoPage implements OnInit {
  // Data passed in by componentProps
  @Input() comportamientoId: number;
  @Input() matriz: MatrizIterface;
  @Input() readonly: string;
  comportamiento: ComportamientoInterface;

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const comp = this.matriz?.comportamientos.filter(x=>x.id == this.comportamientoId);
    if(comp && comp[0]){
      this.comportamiento = comp[0];
    }
  }

  dismiss(value) {
    this.modalController.dismiss({
      'comportamientoValue': value
    });
  }
}
