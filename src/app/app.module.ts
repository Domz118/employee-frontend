import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { EmployeeComponent } from './employee/employee.component';



import { DepartmentDetailsComponent } from './department/department-details/department-details.component';
import { DepartmentListComponent } from './department/department-list/department-list.component';
import { EmployeeDetailsComponent } from './employee/employee-details/employee-details.component';
import { EmployeeListComponent } from './employee/employee-list/employee-list.component';





import { DepartmentPipe } from './filter/department/department.pipe';
import { EmployeePipe } from './filter/employee/employee.pipe';




import { HomeComponent } from './menu/home/home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';

import { IndexComponent } from './index/index.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AboutUsComponent } from './menu/about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    EmployeeComponent,
    DepartmentDetailsComponent,
    DepartmentListComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    DepartmentPipe,
    EmployeePipe,
    HomeComponent,
    LoginComponent,
    ForgetPasswordComponent,
    IndexComponent,
    SignUpComponent,
    AboutUsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent, IndexComponent]
})
export class AppModule { }
