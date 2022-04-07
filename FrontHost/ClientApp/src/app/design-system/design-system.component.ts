import { Component, OnInit } from '@angular/core';
import { FrontBaseComponent } from '../layout/layout.component';

@Component({
  selector: 'app-design-system',
  templateUrl: './design-system.component.html'
 })
export class DesignSystemComponent extends FrontBaseComponent  {
  dis = false;
 
  tempIcon = this.sanitizer.bypassSecurityTrustHtml(`<path d="M12.3 8.93L9.88 6.5H15.5V10H17V5H9.88L12.3 2.57L11.24 1.5L7 5.75L11.24 10L12.3 8.93M12 14A3 3 0 1 0 15 17A3 3 0 0 0 12 14M3 11V23H21V11M19 19A2 2 0 0 0 17 21H7A2 2 0 0 0 5 19V15A2 2 0 0 0 7 13H17A2 2 0 0 0 19 15Z" />`)
}