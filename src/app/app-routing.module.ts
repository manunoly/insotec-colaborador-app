import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'evaluador',
    loadChildren: () => import('./evaluador/evaluador.module').then( m => m.EvaluadorPageModule)
  },
  {
    path: 'usuario',
    loadChildren: () => import('./usuario/usuario.module').then( m => m.UsuarioPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'evaluar',
    loadChildren: () => import('./evaluar/evaluar.module').then( m => m.EvaluarPageModule)
  },
  {
    path: 'evaluar/:id',
    loadChildren: () => import('./evaluar/evaluar.module').then( m => m.EvaluarPageModule)
  },
  {
    path: 'evaluados',
    loadChildren: () => import('./evaluados/evaluados.module').then( m => m.EvaluadosPageModule)
  },
  {
    path: 'evaluaciones',
    loadChildren: () => import('./evaluaciones/evaluaciones.module').then( m => m.EvaluacionesPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'evaluaciones-detalles/:id',
    loadChildren: () => import('./evaluaciones-detalles/evaluaciones-detalles.module').then( m => m.EvaluacionesDetallesPageModule)
  },
  {
    path: 'modal-matriz-comportamiento',
    loadChildren: () => import('./modal-matriz-comportamiento/modal-matriz-comportamiento.module').then( m => m.ModalMatrizComportamientoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
