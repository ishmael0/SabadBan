import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FrontBaseComponent } from '../layout/layout.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent extends FrontBaseComponent{


}
