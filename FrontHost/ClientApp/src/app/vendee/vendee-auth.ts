import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../data.service';
import { VendeeModule } from './vendee.module';
@Injectable({ providedIn: 'root' })
export class VendeeAuthService implements CanActivate {
  constructor(private router: Router, public ds: DataService, public ns: NzNotificationService) { }

  //user!: UserData;
  token!: string;
  lastTokenDateTime = '';
  login(token: string) {
    //this.user = d;
    this.token = token;
    localStorage.setItem("token", token);
    //localStorage.setItem(UserData.name, JSON.stringify(d));
    this.router.navigate(['/home/account']);
  }

  logOut() {
    //this.user = {};
    localStorage.removeItem(DataService.name)
    this.token = '';
    localStorage.removeItem("token");
    this.router.navigate(['/']);
  }


  isLoggedIn() {
    if (this.token && this.token != '') return true;
    var temp = localStorage.getItem('token');
    if (temp) {
      this.token = temp;
      this.ds.load();
      //this.user = localStorage.getItem(UserData.name) as UserData;
      return true;
    }
    return false;
  }
  canActivate(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (this.isLoggedIn()) {
      return true;
    }
    this.logOut();
    return false;
  }
}
