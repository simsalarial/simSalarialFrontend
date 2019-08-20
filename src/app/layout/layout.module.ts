import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AdminModule } from './admin/admin.module';
import { SimListComponent } from './user/sim-list/sim-list.component';
import { AccountManagComponent } from './user/account-manag/account-manag.component';


@NgModule({
  declarations: [LayoutComponent, UserComponent, SimListComponent, AccountManagComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    //AdminModule,
    FormsModule,
    SharedModule
  ]
})
export class LayoutModule { }
