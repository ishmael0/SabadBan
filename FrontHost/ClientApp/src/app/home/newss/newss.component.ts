import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FrontBaseComponent } from '../../shared/shared.module';

@Component({
  selector: 'app-newss',
  templateUrl: './newss.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewssComponent extends FrontBaseComponent{


}
