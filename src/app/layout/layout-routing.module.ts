import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path: "", 
   component: LayoutComponent, 
   children:[
    {path: "admin",  loadChildren: () => import('./admin/admin.module').then(module => module.AdminModule)},
    /* {path: "admin",  component:AdminComponent}, */
    {path: "user", component: UserComponent},
   /*  {path: "", redirectTo: "/layout/admin", pathMatch: "full"} */
   ]},
  {path: "", redirectTo: "/admin", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
