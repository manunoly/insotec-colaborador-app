import { SharedModule } from './../share/share.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvaluadosPageRoutingModule } from './evaluados-routing.module';

import { EvaluadosPage } from './evaluados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    EvaluadosPageRoutingModule
  ],
  declarations: [EvaluadosPage]
})
export class EvaluadosPageModule {}
