import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SimuladorComponent } from './components/simulador/simulador.component';
import { TablesComponent } from './components/tables/tables.component';



@NgModule({
  declarations: [HeaderComponent, SimuladorComponent, TablesComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedModule { }
