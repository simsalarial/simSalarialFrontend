import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimuladorComponent } from './components/simulador/simulador.component';
import { TablesComponent } from './components/tables/tables.component';
import { FieldTaxComponent } from './components/field-tax/field-tax.component';



@NgModule({
  declarations: [HeaderComponent, SimuladorComponent, TablesComponent, FieldTaxComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    FieldTaxComponent
  ]
})
export class SharedModule { }
