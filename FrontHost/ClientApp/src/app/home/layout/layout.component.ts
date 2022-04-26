import { Component, OnInit, ChangeDetectionStrategy, Directive, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { HTTPTypes, RequestPlus } from '../../../../../../../Santel/ClientApp/src/app/services/utils';
import { FrontBaseComponent } from '../../shared/shared.module';




@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../../../ant.scss']
})
export class LayoutComponent extends FrontBaseComponent {
  showMenu = false;
  ok = false;
  override async ngOnInit() {
    this.ds.firstLoad();
    await this.http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'Data', {
      tokenNeeded: false,
      action: 'Init',
      onSuccess: (m, d) => {
        this.ds.load(d);
        this.ok = true;
      },
      onError: (m, d) => { },
    }))

  }
}





