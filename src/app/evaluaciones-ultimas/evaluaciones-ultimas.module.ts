import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluacionesUltimasPageRoutingModule } from './evaluaciones-ultimas-routing.module';

import { EvaluacionesUltimasPage } from './evaluaciones-ultimas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluacionesUltimasPageRoutingModule
  ],
  declarations: [EvaluacionesUltimasPage]
})
export class EvaluacionesUltimasPageModule {}
