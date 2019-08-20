import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimuladorComponent } from './components/simulador/simulador.component';
import { TablesComponent } from './components/tables/tables.component';
import { FieldTaxComponent } from './components/field-tax/field-tax.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SliderComponent } from './components/slider/slider.component';
import { Ng5SliderModule } from 'ng5-slider';



@NgModule({
  declarations: [HeaderComponent, SimuladorComponent, TablesComponent, FieldTaxComponent, SliderComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    Ng5SliderModule,
  ],
  exports: [
    HeaderComponent,
    FieldTaxComponent,
    TablesComponent,
    SliderComponent
  ]
})
export class SharedModule { }
