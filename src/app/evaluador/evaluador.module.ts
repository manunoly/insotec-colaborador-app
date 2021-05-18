import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluadorPageRoutingModule } from './evaluador-routing.module';

import { EvaluadorPage } from './evaluador.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvaluadorPageRoutingModule
  ],
  declarations: [EvaluadorPage]
})
export class EvaluadorPageModule {}
