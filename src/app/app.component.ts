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
          { title: 'Mis Evaluaciones', url: '/evaluaciones', icon: 'people' },
          { title: 'Usuario', url: '/profile', icon: 'settings' },
        ];

        if(this.auth.tienePermiso('evaluador')){
          this.appPages.push(
            { title: 'Mis Evaluados', url: '/evaluados', icon: 'people' }
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
