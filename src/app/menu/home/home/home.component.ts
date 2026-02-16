import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { LoginService } from 'src/app/service/login/login.service';

import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  showDoctorBoard = false;
  username: string;
    users: any[] = [];   // 👈 users list
    userList : any[] = [];
    desc: string = '';
      search: string = '';

  profileImageUrls: string[] = [];
  selectedFiles: File[] = [];

  title = 'fileuploadanddownload-fromt';

  filenames: string[] = [];
  fileStatus = {
    status: '',
    requestType: '',
    percent: 0
  };
  constructor(private router: Router, private tokenStorageService: TokenStorageService, private ls: LoginService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    console.log(this.isLoggedIn);
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.showUserBoard = this.roles.includes('ROLE_USER');
       this.showDoctorBoard = this.roles.includes('ROLE_DOCTOR');
      this.username = user.username;
      console.log(this.username);

      if (this.showAdminBoard) {
            this.loadUsers();

          }  else if (this.showUserBoard || this.showDoctorBoard) {
                   this.searchUser(); //  pass logged-in username


                 }

    }else{
      this.router.navigate(['login']);
    }
  }
loadUsers(): void {
    this.ls.getAllUsers().subscribe({
      next: (data) => {
        this.users = data.content; // ✅ important: Page<User> → content
      },
      error: (err) => {
        console.error('Error loading users', err);
      }
    });
  }

 searchUser(): void {
   const username = this.tokenStorageService.getUsername();

    if (username) {
      this.ls.searchUsers(username).subscribe({
        next: (data) => {
          this.users = data.content;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
        }
      });
    }
  }


}

//backend @EnableGlobalMethodSecurity(prePostEnabled = true)
