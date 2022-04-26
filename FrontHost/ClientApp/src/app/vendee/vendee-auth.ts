import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataService } from '../data.service';
import { VendeeModule } from './vendee.module';
@Injectable({ providedIn: 'root' })
export class VendeeAuthService implements CanActivate {
  constructor(private router: Router, public ds: DataService, public ns: NzNotificationService) { }

  //user!: UserData;
  lastTokenDateTime = '';
  login(token: string) {
    this.ds.load({ Token: token })
    //this.user = d;
    //localStorage.setItem(UserData.name, JSON.stringify(d));
    this.router.navigate(['/home/account']);
  }

  logOut() {
    //this.user = {};
    localStorage.removeItem(DataService.name)
    this.ds.ClearAll();
    this.router.navigate(['/']);
  }


  isLoggedIn() {
    if (this.ds.Token && this.ds.Token != '') return true;
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
