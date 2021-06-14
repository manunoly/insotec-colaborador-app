import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMatrizComportamientoPageRoutingModule } from './modal-matriz-comportamiento-routing.module';

import { ModalMatrizComportamientoPage } from './modal-matriz-comportamiento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMatrizComportamientoPageRoutingModule
  ],
  declarations: [ModalMatrizComportamientoPage]
})
export class ModalMatrizComportamientoPageModule {}
