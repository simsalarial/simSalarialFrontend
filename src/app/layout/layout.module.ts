import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
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
import { MatButtonModule, MatButtonToggleModule, MatIconModule, MatProgressSpinnerModule, MatToolbarModule, MatSidenavModule, MatMenuModule, MatListModule, MatDividerModule, MatGridListModule, MatExpansionModule, MatCardModule, MatTabsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatAutocompleteModule, MatCheckboxModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';

import { CompareSimComponent } from './user/compare-sim/compare-sim.component';

const MaterialComponents = [
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule,
  MatCardModule,
  MatTabsModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
];

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
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,

  ]
})
export class LayoutModule { }
