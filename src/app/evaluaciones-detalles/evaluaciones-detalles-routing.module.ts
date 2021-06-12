import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluacionesDetallesPage } from './evaluaciones-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluacionesDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluacionesDetallesPageRoutingModule {}
