import { NgModule, Directive, ChangeDetectorRef} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';


import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { HttpRequestService } from '../http-request';
import { VendeeAuthService } from '../vendee/vendee-auth';
import { DataService } from '../data.service';
import { environment } from '../app.module';
import { ModalDirective } from './modal.directive';
import { CounterDirective } from './counter.directive';


@Directive()
export class FrontBaseComponent {
  constructor(
    public formBuilder: FormBuilder,
    public http: HttpRequestService,
    public sanitizer: DomSanitizer,
    public titleService: Title,
    public auth: VendeeAuthService,
    public activatedroute: ActivatedRoute,
    public ds: DataService,
    public router: Router,
    public cdr: ChangeDetectorRef) {
    this.environmentProduction = environment.production;
  }
  environmentProduction = true;
  icons = {
    refresh: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z" /></svg>`),
    checkall: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 24 24">    <path fill="currentColor" d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" /></svg>`)
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
  public setTitle(str: string) {
    this.titleService.setTitle(`سبدبان ${str}`);
  }
}
@NgModule({
  declarations: [
    ModalDirective,
    CounterDirective,
  ],
  imports: [
    CommonModule,

    NzCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NzTreeModule,
    NzTableModule,
    NzSpinModule,
    NzGridModule,
    NzDropDownModule
  ],
  exports: [
    NzCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NzTreeModule,
    NzTableModule,
    NzSpinModule,
    NzGridModule,
    NzDropDownModule,
    ModalDirective,
    CounterDirective,
  ],
  //providers: [NzNotificationService, DecimalPipe]
})
export class SharedModule {
  static forChild() {
    return {
      ngModule: SharedModule,
      providers: [
        //NzNotificationService, HttpRequestService
      ],
    };
  }
}
