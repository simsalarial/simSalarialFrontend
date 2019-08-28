import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimuladorComponent } from './components/simulador/simulador.component';
import { TablesComponent } from './components/tables/tables.component';
import { FieldTaxComponent } from './components/field-tax/field-tax.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SliderComponent } from './components/slider/slider.component';
import { Ng5SliderModule } from 'ng5-slider';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { SimDetailComponent } from './components/sim-detail/sim-detail.component';
import { CompareSimComponent } from './components/compare-sim/compare-sim.component';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [HeaderComponent, SimuladorComponent, TablesComponent, FieldTaxComponent, SliderComponent, SimDetailComponent, CompareSimComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    Ng5SliderModule,
    NgxDatatableModule,
    ShowHidePasswordModule,
    TooltipModule.forRoot()
  ],
  exports: [
    HeaderComponent,
    FieldTaxComponent,
    TablesComponent,
    SliderComponent,
    SimuladorComponent, 
    SimDetailComponent, 
    CompareSimComponent

  ]
})
export class SharedModule { }
