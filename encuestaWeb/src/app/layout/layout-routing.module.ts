import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: '', redirectTo: 'encuesta-votar', pathMatch: 'prefix' },
        { path: 'encuesta-listar', loadChildren: () => import('./encuesta-listar/encuesta-listar.module').then(m => m.EncuestaListarModule), canActivate: [AuthGuard] },
        { path: 'encuesta-votar', loadChildren: () => import('./encuesta-votar/encuesta-votar.module').then(m => m.EncuestaVotarModule), canActivate: [AuthGuard] },
        { path: 'blank-page', loadChildren: () => import('./blank-page/blank-page.module').then(m => m.BlankPageModule) }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
