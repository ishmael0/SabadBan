import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FrontBaseComponent } from '../../shared/shared.module';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesComponent extends FrontBaseComponent{


}
