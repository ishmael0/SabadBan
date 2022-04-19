import { Component, OnInit, ChangeDetectionStrategy, Directive, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { HttpRequestService } from '../../http-request';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from '../../data.service';
import { AuthService } from '../../auth';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { environment } from '../../app.module';
import { HTTPTypes, RequestPlus } from '../../../../../../../Santel/ClientApp/src/app/services/utils';


@Directive()
export class FrontBaseComponent {
  constructor(
    public formBuilder: FormBuilder,
    public http: HttpRequestService,
    public sanitizer: DomSanitizer,
    public titleService: Title,
    public auth: AuthService,
    public activatedroute: ActivatedRoute,
    public ds: DataService,
    public router: Router,
    public cdr: ChangeDetectorRef) {
    this.environmentProduction = environment.production;
  }
  environmentProduction = true;
  icons = {
    refresh: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" /></svg>`),
    checkall: this.sanitizer.bypassSecurityTrustHtml(`<svg style="width:24px;height:24px" viewBox="0 0 24 24">    <path fill="currentColor" d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" /></svg>`)
  }

  async ngOnInit() {
  }
  openInNewWindow(route: string) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([route])
    );

    window.open(url, '_blank');
  }
  get front() { return "/home" };
  prefixUrl(url: string) { return "/" + (url[0] == '/' ? url : ("/" + url)) };

  public setTitle(str: string) {
    this.titleService.setTitle(`سبدبان ${str}`);
  }
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../ant.scss']
})
export class LayoutComponent extends FrontBaseComponent {
  showMenu = false;
  override async ngOnInit() {
    await this.http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'Data', {
      tokenNeeded: false,
      action: 'Init',
      onSuccess: (m, d) => { this.ds.init(d); console.log(d) },
      onError: (m, d) => { },
    }))

  }
}





