import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EncuestaVotarRoutingModule } from './encuesta-votar-routing.module';
import { EncuestaVotarComponent } from './encuesta-votar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EncuestaVotarComponent],
  imports: [
    CommonModule,
    EncuestaVotarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EncuestaVotarModule { }
