import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [LayoutComponent, AdminComponent, UserComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class LayoutModule { }
