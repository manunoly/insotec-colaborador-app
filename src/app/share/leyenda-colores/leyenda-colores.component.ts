import { UtilService } from './../../services/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leyenda-colores',
  templateUrl: './leyenda-colores.component.html',
  styleUrls: ['./leyenda-colores.component.scss'],
})
export class LeyendaColoresComponent implements OnInit {
  leyendaValues = [
    { valor: 0, descripcion: "Comportamiento no satisfactorio" },
    { valor: 1, descripcion: "Comportamiento por mejorar" },
    { valor: 2, descripcion: "Comportamiento aceptable" },
    { valor: 3, descripcion: "Comportamiento satisfactorio" }
  ];

  constructor(public util: UtilService) { }

  ngOnInit() { }

}
