import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluadorPage } from './evaluador.page';

const routes: Routes = [
  {
    path: '',
    component: EvaluadorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvaluadorPageRoutingModule {}
