import { Component, OnInit, ChangeDetectionStrategy,Directive } from '@angular/core';
@Directive()
export abstract class FrontBaseComponent {
  openInNewWindow(url: string) {
    window.open(url, '_blank');
  }
  get front() { return "/home" };
  prefixUrl(url: string) { return "/home" + (url[0] == '/' ? url.substring(1):url) };
}

@Component({
  selector: 'app-lay-out',
  templateUrl: './lay-out.component.html',
  styles: [
    ``
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayOutComponent extends FrontBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}





