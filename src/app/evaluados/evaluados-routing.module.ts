import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluadosPage } from './evaluados.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluadosPageRoutingModule {}
