import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOwnerComponent } from './create-owner/create-owner.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './details/details.component';
import { NewRegisterComponent } from './new-register/new-register.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'register', component: NewRegisterComponent },
  { path: 'edit/:id', component: NewRegisterComponent},
  { path: 'create-owner', component: CreateOwnerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
