import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../service/login/login.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  myImage: string = 'assets/Image/image.jpg';

  resetForm: any = {
    email: '',
    password: '',
    password2: ''
  };

  constructor(
    private ls: LoginService,
    private router: Router
  ) {}

    resetPassword(): void {

      if (this.resetForm.password !== this.resetForm.password2) {
        alert('Passwords do not match');
        return;
      }

      this.ls.resetPassword(this.resetForm).subscribe(
        (res: string) => {
          alert(res);               // 👈 backend string
          this.router.navigate(['login']);
        },
        err => {
          alert(err.error);
        }
      );
    }

}
