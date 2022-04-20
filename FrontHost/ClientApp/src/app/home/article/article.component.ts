import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FrontBaseComponent } from '../../shared/shared.module';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleComponent extends FrontBaseComponent {
 

}
