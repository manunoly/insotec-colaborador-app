import { UtilService } from './../services/util.service';
import { ApiService } from './../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluaciones-detalles',
  templateUrl: './evaluaciones-detalles.page.html',
  styleUrls: ['./evaluaciones-detalles.page.scss'],
})
export class EvaluacionesDetallesPage implements OnInit {
  id;
  data;
  constructor(private activatedRoute: ActivatedRoute, private api: ApiService, private util:UtilService) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getData(this.id);
  }


  async getData(id){
    try {
      await this.util.showLoading();
      const response = await this.api.getData(`evaluaciones/${id}`);
      this.data = response as any;
      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

  verComportamientoDetalle(id, matriz){
    this.util.modalComportamiento(id, matriz);
  }
}
