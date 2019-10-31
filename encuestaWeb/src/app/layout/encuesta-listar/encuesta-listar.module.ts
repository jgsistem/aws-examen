import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

import { EncuestaListarRoutingModule } from './encuesta-listar-routing.module';
import { EncuestaListarComponent } from './encuesta-listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [EncuestaListarComponent],
  imports: [
    CommonModule,
    EncuestaListarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class EncuestaListarModule { }
