import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public appPages = [];
  constructor(private auth: AuthService) {
    this.auth.getUser().subscribe(user=>{
      if(!user){
        return this.appPages = [];
      }else{
        this.appPages = [
          { title: 'Mis evaluaciones', url: '/evaluaciones', icon: 'people' },
          { title: 'Mi perfil', url: '/profile', icon: 'settings' },
        ];

        if(this.auth.tienePermiso('evaluador')){
          this.appPages.push(
            { title: 'Mis evaluados', url: '/evaluados', icon: 'people' }
          );
        }

        if(this.auth.tienePermiso('admin') || this.auth.tienePermiso('gerencia') || this.auth.tienePermiso('gerenteagencia') || this.auth.tienePermiso('gerentesucursal')){
          this.appPages.push(
            { title: 'Dashboard', url: '/dashboard', icon: 'grid' }
          );
        }
      }
    })
  }
}
