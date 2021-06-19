import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
  }

  tienePermiso(persimo){
    return this.auth.tienePermiso(persimo);
  }
}
