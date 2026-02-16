import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../service/token-storage.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  myImage:string ="assets/Image/image.jpg";

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showDoctorBoard = false;
  username: string;

  constructor(private router: Router, private tokenStorageService: TokenStorageService){}
  ngOnInit(){
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showDoctorBoard = this.roles.includes('ROLE_DOCTOR');

      this.username = user.username;
    }
    else{
      this.router.navigate(['login']);
    }
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }


  employeeList(){
    this.router.navigate(['employeeList']);
  }




  logout(){
	//window.sessionStorage.clear();
	//window.location.reload();
	this.router.navigate(['login']);
  this.tokenStorageService.signOut();
  // window.location.reload();
  }

  home(){
    this.router.navigate(['home']);
  }


  about(){
    this.router.navigate(['about']);
  }

}
