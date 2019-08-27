import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SimuladorComponent } from '../shared/components/simulador/simulador.component';
import { AccountManagComponent } from './account-manag/account-manag.component';
import { SimManagComponent } from './sim-manag/sim-manag.component';
import { ImportTableComponent } from './import-table/import-table.component';
import { SimListComponent } from './sim-list/sim-list.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {path: "simulador", component: SimuladorComponent },
      {path: "gestaodecontas", component: AccountManagComponent},
      {path: "gestaosimulador", component: SimManagComponent},
      {path: "importarIRS", component: ImportTableComponent},
      {path: "listarsimulacoes", component: SimListComponent},
      {path: "", redirectTo: "gestaodecontas", pathMatch: "full"}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
