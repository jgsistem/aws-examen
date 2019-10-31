import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EncuestaVotarComponent } from './encuesta-votar.component';


const routes: Routes = [
  {
    path: '',
    component: EncuestaVotarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncuestaVotarRoutingModule { }
