import { Component, OnInit, ChangeDetectionStrategy,Directive, ViewEncapsulation } from '@angular/core';
@Directive()
export abstract class FrontBaseComponent {
  openInNewWindow(url: string) {
    window.open(url, '_blank');
  }
  get front() { return "/home" };
  prefixUrl(url: string) { return "/home" + (url[0] == '/' ? url:("/"+ url)) };
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class LayoutComponent extends FrontBaseComponent implements OnInit {

  constructor() {
    super();
  }
  showMenu = false;
  ngOnInit(): void {
  }

}





