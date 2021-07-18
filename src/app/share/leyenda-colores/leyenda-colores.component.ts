import { UtilService } from './../../services/util.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leyenda-colores',
  templateUrl: './leyenda-colores.component.html',
  styleUrls: ['./leyenda-colores.component.scss'],
})
export class LeyendaColoresComponent implements OnInit {
  leyendaValues = [
    { valor: 0, descripcion: "No satisfactorio" },
    { valor: 1, descripcion: "Por mejorar" },
    { valor: 2, descripcion: "Aceptable" },
    { valor: 3, descripcion: "Satisfactorio" }
  ];

  constructor(public util: UtilService) { }

  ngOnInit() { }

}
