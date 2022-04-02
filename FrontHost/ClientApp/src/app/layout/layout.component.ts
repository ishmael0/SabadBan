import { Component, OnInit, ChangeDetectionStrategy, Directive, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { HttpRequestService } from '../http-request';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { DataService } from '../data.service';

@Directive()
export abstract class FrontBaseComponent {
  openInNewWindow(url: string) {
    window.open(url, '_blank');
  }
  get front() { return "/home" };
  prefixUrl(url: string) { return "/" + (url[0] == '/' ? url : ("/" + url)) };
  constructor(public formBuilder: FormBuilder,
    public http: HttpRequestService,
    public sanitizer: DomSanitizer,
    public ds: DataService,
    public cdr: ChangeDetectorRef) {
    
  }
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent extends FrontBaseComponent implements OnInit {

  showMenu = false;
  ngOnInit(): void {
  }

}





