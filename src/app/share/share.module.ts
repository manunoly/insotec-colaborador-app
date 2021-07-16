import { LeyendaColoresComponent } from './leyenda-colores/leyenda-colores.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { HeaderInsotecComponent } from './header-insotec/header-insotec.component';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule],
    declarations: [HeaderInsotecComponent, LeyendaColoresComponent],
    exports: [HeaderInsotecComponent,LeyendaColoresComponent],
    entryComponents: [HeaderInsotecComponent,LeyendaColoresComponent]
})

export class SharedModule { }
