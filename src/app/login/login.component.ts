import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // username: string;
  // password: string;
  myImage:string ="assets/Image/image.jpg";
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showForgotPassword = false;
  resetForm: any = {};


  constructor(private ls: LoginService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.gotoIndex();
    }
  }

  doLogin(): void {
    this.ls.login(this.form).subscribe(
      data => {

      if (data.accountExpired) {
        this.errorMessage = 'Your account is expired';
        this.isLoginFailed = true;
        alert(this.errorMessage);
        return;
      }

      if (data.accountLocked) {
        this.errorMessage = 'Your account is locked';
        this.isLoginFailed = true;
        alert(this.errorMessage);
        return;
      }

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        alert('Logged In as ' + this.roles);
        this.gotoIndex();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        alert('Login Failed + ' + this.errorMessage);
      }
    );
  }

  // doLogin(){
  //   console.log("username " + this.username);
  //   console.log("password " + this.password);
  //   this.ls.login(this.username, this.password)
  //     .subscribe((data) => {
  //       console.log(data);
  //       alert('login Success');
  //       this.gotoIndex();
  //     },
  //     error=>{
  //       alert('LOGIN FAILED');
  //     })
  // }
resetPassword(): void {
  this.ls.resetPassword(this.resetForm).subscribe(
    res => {
      alert('Password reset successful');
      this.showForgotPassword = false;
      this.resetForm = {};
    },
    err => {
      alert(err.error.message || 'Password reset failed');
    }
  );
}

  gotoIndex(){
    this.router.navigate(['home']);
  }


}
