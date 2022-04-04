import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HTTPTypes, RequestPlus } from '../../../../../../Santel/ClientApp/src/app/services/utils';
import { FrontBaseComponent } from '../layout/layout.component';

@Component({
  selector: 'app-vendee-invoices',
  templateUrl: './vendee-invoices.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeInvoicesComponent extends FrontBaseComponent {

  async data() {
    await this.http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'Data', {
      action: 'GetInvoices',
      onSuccess: (m, d) => {
        console.log(d);
        this.list = d;
        this.cdr.detectChanges();
      },
      onError: (m, d) => {
        console.log(d);
        this.list = d;
      },
    }))
  }
   override async ngOnInit() {
     super.ngOnInit();
     await this.data();
  }
  list :any[]= []
}
