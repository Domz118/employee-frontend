  import { Injectable } from '@angular/core';

  const TOKEN_KEY = 'auth-token';
  const USER_KEY = 'auth-user';

  @Injectable({
    providedIn: 'root'
  })
  export class TokenStorageService {

    private ROLE_KEY = 'auth-role';

    constructor() {}

    /** Sign out the user by clearing the session storage */
    signOut(): void {
      window.sessionStorage.clear();
    }

    /** Save the token to sessionStorage */
    public saveToken(token: string): void {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    /** Get the token from sessionStorage */
    public getToken(): string | null {
      return sessionStorage.getItem(TOKEN_KEY);
    }

    /** Save the user object to sessionStorage */
    public saveUser(user: any): void {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    /** Get the user object from sessionStorage */
    public getUser(): any {
      const user = sessionStorage.getItem(USER_KEY);
      return user ? JSON.parse(user) : null;
    }

  getUsername(): string | null {
    return this.getUser()?.username ??
     null;
    }

    /** Save user role explicitly (optional helper) */
    public saveUserRole(role: string): void {
      window.sessionStorage.removeItem(this.ROLE_KEY);
      window.sessionStorage.setItem(this.ROLE_KEY, role);
    }

    /** Get the first user role (e.g. 'ROLE_USER', 'ROLE_ADMIN') */
    public getUserRole(): string {
      const user = this.getUser();
      if (user && user.roles && user.roles.length > 0) {
        return user.roles[0];  // Return the first role (e.g. "ROLE_USER")
      }
      // fallback: check ROLE_KEY if stored separately
      const role = sessionStorage.getItem(this.ROLE_KEY);
      return role ? role : 'ROLE_USER';
    }

    /** Check if the current user has the 'ROLE_ADMIN' */
    public isAdmin(): boolean {
      return this.getUserRole() === 'ROLE_ADMIN';
    }

    /** Check if the current user has the 'ROLE_USER' */
    public isUser(): boolean {
      return this.getUserRole() === 'ROLE_USER';
    }

    /** Get patient ID from stored user object */
    public getPid(): number {
      return this.getUser()?.pid;
    }

    /** Get patient name from stored user object */
    public getPname(): string {
      return this.getUser()?.pname;
    }
  }
