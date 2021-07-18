import { AuthService } from './../services/auth.service';
import { ApiService } from './../services/api.service';
import { UtilService } from './../services/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-evaluaciones-ultimas',
  templateUrl: './evaluaciones-ultimas.page.html',
  styleUrls: ['./evaluaciones-ultimas.page.scss'],
})
export class EvaluacionesUltimasPage implements OnInit {
  id;
  data;
  userId = '';
  colaborador;
  comportamientos;
  recomendaciones;

  constructor(private auth: AuthService, private _navigation: Location, private api: ApiService, private router: Router, private util: UtilService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.userId = this.activatedRoute.snapshot.paramMap.get('user_id');
    if(!this.id){
      this.util.showMessage('No hemos identificado el trabajador');
      return this._navigation.back();
    }

    // if(!this.userId){
    //   const user = this.auth.getUser().subscribe(user=>{
    //     this.colaborador = user;
    //     this.userId = user['id'];
    //     if(!this.userId){
    //       this.util.showMessage('No hemos identificado el trabajador');
    //       return this._navigation.back();
    //     }
    //   })
    //   setTimeout(() => {
    //     user.unsubscribe();
    //   }, 1000);

    // }else{
    //   this.api.getData('users/' + this.userId).then(user=>{
    //     this.colaborador = user;
    //   }).catch()
    // }

    this.getData();
  }

  async getData() {
    try {
      await this.util.showLoading();
      const response = await this.api.getData(`evaluaciones/${this.id}/ultimas/${this.userId ? this.userId : ''}`);
      this.data = response as any;
      if(this.data && this.data.length){
        this.comportamientos = this.data[0]['comportamientos'] ? this.data[0]['comportamientos'].map(x=>x.comportamiento) : [];
        //console.log('this.comportamientos', this.comportamientos);
        this.colaborador = this.data[0]['user'];
      }

      this.util.dismissLoading();
    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }

  async verComportamientoDetalle(id){
    //console.log(id,this.data[0]?.matriz);
    const modal = await this.util.modalComportamiento(id, this.data[0]?.matriz);
  }

  getEvaluacionValor(columna, comportamientoId){
    if(this.data && this.data[columna]){
      const evaluacion = this.data[columna]?.comportamientos.find(x => x?.comportamiento?.id == comportamientoId);
      if(evaluacion){
        return evaluacion?.valor_evaluacion;
      }
    }
    return '-';
  }

  getEvaluacionValorPromedio(columna){
    if(this.data && this.data[columna]){
      const evaluacion = this.data[columna];
      if(evaluacion && evaluacion.nota_promedio){
        return evaluacion.nota_promedio;
      }
    }
    return '-';
  }


  async guardar(){
    try {
      await this.util.showLoading();
      const resp = await this.api.put('evaluaciones/' + this.id, {observaciones: this.recomendaciones});
      this.router.navigateByUrl('inicio',{replaceUrl: true});
      this.util.showMessage('Evaluación registrada exitosamente');
      this.util.dismissLoading();

    } catch (error) {
      this.util.dismissLoading();
      this.util.handleError(error);
    }
  }
}
