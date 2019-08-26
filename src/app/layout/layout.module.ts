import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { SimListComponent } from './user/sim-list/sim-list.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SimDetailComponent } from './user/sim-detail/sim-detail.component';
import { CompareSimComponent } from './user/compare-sim/compare-sim.component';


@NgModule({
  declarations: [LayoutComponent, UserComponent, SimListComponent, SimDetailComponent, CompareSimComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    //AdminModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    ModalModule.forRoot()
  ]
})
export class LayoutModule { }
