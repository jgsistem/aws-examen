import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { AuthGuard } from '../shared';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbDropdownModule
  ],
  providers: [AuthGuard],
})
export class LayoutModule { }
