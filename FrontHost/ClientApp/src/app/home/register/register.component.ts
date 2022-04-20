import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FrontBaseComponent } from '../../shared/shared.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent extends FrontBaseComponent{

}
