import { SharedModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluacionesDetallesPageRoutingModule } from './evaluaciones-detalles-routing.module';

import { EvaluacionesDetallesPage } from './evaluaciones-detalles.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    EvaluacionesDetallesPageRoutingModule
  ],
  declarations: [EvaluacionesDetallesPage]
})
export class EvaluacionesDetallesPageModule {}
