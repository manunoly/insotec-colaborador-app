import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMatrizComportamientoPage } from './modal-matriz-comportamiento.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMatrizComportamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMatrizComportamientoPageRoutingModule {}
