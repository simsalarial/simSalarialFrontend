import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AccountManagComponent } from './account-manag/account-manag.component';
import { SimManagComponent } from './sim-manag/sim-manag.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportTableComponent } from './import-table/import-table.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NewAccountComponent } from './account-manag/new-account/new-account.component';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [AdminComponent, AdminMainComponent, AccountManagComponent,SimManagComponent, DashboardComponent, ImportTableComponent, NewAccountComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
    FontAwesomeModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  entryComponents: [NewAccountComponent]
})
export class AdminModule { }
