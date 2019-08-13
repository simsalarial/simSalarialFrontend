import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

// const routes: Routes = [
//   {path: "", 
//    loadChildren: () => import('./layout/layout.module').then(module => module.LayoutModule),
//    canActivate: [AuthGuard]
//   },
//   {path: "login", component: LoginComponent},
//   {path: "not-found", component: NotFoundComponent},
//   {path: "**", redirectTo: "not-found"},
// ];

const routes: Routes = [
  {path: "", 
   loadChildren: () => import('./layout/admin/admin.module').then(module => module.AdminModule)
  },
  {path: "login", component: LoginComponent},
  {path: "not-found", component: NotFoundComponent},
  {path: "**", redirectTo: "not-found"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
