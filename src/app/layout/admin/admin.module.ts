import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AccountManagComponent } from './account-manag/account-manag.component';
import { SimManagComponent } from './sim-manag/sim-manag.component';
import { ImportTableComponent } from './import-table/import-table.component';
import { MatTableModule } from '@angular/material';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NewAccountComponent } from './account-manag/new-account/new-account.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SimListComponent } from './sim-list/sim-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [AdminComponent, AccountManagComponent, SimManagComponent, ImportTableComponent, NewAccountComponent, SimListComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    AdminRoutingModule,
    FontAwesomeModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    MatTableModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  entryComponents: [NewAccountComponent]
})
export class AdminModule { }
