import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { SimuladorComponent } from '../shared/components/simulador/simulador.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { AccountManagComponent } from './account-manag/account-manag.component';
import { SimManagComponent } from './sim-manag/sim-manag.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImportTableComponent } from './import-table/import-table.component';

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      {path: "simulador", component: SimuladorComponent },
      {path: "", component: AdminMainComponent },
      {path: "gestaodecontas", component: AccountManagComponent},
      {path: "gestaosimulador", component: SimManagComponent},
      {path: "dashboard", component: DashboardComponent},
      {path: "importarIRS", component: ImportTableComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
