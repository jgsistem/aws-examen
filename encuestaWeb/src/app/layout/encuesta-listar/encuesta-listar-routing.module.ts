import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaListarComponent } from './encuesta-listar.component';


const routes: Routes = [
  {
    path: '',
    component: EncuestaListarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestaListarRoutingModule { }
