import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
export class UserData {

}
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private router: Router, public ns: NzNotificationService) { }

  user!: UserData;
  token!: string;
  lastTokenDateTime = '';
  login(d: UserData, token: string) {
    this.user = d;
    this.token = token;
    localStorage.setItem("token", token);
    localStorage.setItem(UserData.name, JSON.stringify(d));
    this.router.navigate(['/home/account']);
  }

  logOut() {
    this.user = {};
    this.token = '';
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }


  isLoggedIn() {
    if (this.token && this.token != '') return true;
    var temp = localStorage.getItem('token');
    if (temp) {
      this.token = temp;
      this.user = localStorage.getItem(UserData.name) as UserData;
      return true;
    }
    return false;
  }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    return true;
    if (this.isLoggedIn()) {
      return true;
    }
    this.logOut();
    return false;
  }
}
