import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { HomeComponent } from './menu/home/home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { IndexComponent } from './index/index.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './menu/about-us/about-us.component';
import {AuthGuard} from './auth/auth.guard.ts';
import {AdminGuard} from './auth/admin.guard.ts';

const routes: Routes = [

  {path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'forget-password', component: ForgetPasswordComponent},
  { path: 'index', component: IndexComponent},

  {path: 'home', component:HomeComponent},
  {path: 'about', component:AboutUsComponent},
  { path: 'signup', component: SignUpComponent },



  { path: 'department' , component: DepartmentComponent ,canActivate: [AuthGuard, AdminGuard]},
  { path: 'departmentList', component: DepartmentListComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: 'departmentUpdate/:id', component:DepartmentComponent,canActivate: [AuthGuard, AdminGuard]},
  { path: 'departmentDetail/:id', component:DepartmentDetailsComponent,canActivate: [AuthGuard, AdminGuard]},


  { path: 'employee' , component: EmployeeComponent },
  { path: 'employeeList' , component: EmployeeListComponent },
  { path: 'employeeUpdate/:id' , component: EmployeeComponent },
  { path: 'employeeDetail/:id' , component: EmployeeDetailsComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
