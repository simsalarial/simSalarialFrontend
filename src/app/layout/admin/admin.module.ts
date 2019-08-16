import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AccountManagComponent } from './account-manag/account-manag.component';
import { SimManagComponent } from './sim-manag/sim-manag.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportTableComponent } from './import-table/import-table.component';
import { MatTableModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [AdminComponent, AdminMainComponent, AccountManagComponent,SimManagComponent, DashboardComponent, ImportTableComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
    FontAwesomeModule,
    NgxDatatableModule,
    MatTableModule
  ]
})
export class AdminModule { }
