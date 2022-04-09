import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { HTTPTypes, NZNotificationTypes, RequestPlus } from '../../../../../../../Santel/ClientApp/src/app/services/utils';
import { HttpRequestService } from '../../http-request';
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent implements OnInit {
  constructor(public http: HttpRequestService,public ts: Title) {

  }
  item: any = {};
  async get() {
    await this.http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'Data', {
      action: 'GetInvoices',
      onSuccess: (m, d) => {
        console.log(d);
        this.item = d;
        this.ts.setTitle(`فاکتور شماره ${d.Id}`);
      },
      onError: (m, d) => {
        console.log(d);
        this.http.createNotification(NZNotificationTypes.error, "خطا", "دریافت لیست فاکتور ها با خطا مواجه شد.")
      },
    }))
  }
 
  async ngOnInit() {
    await this.get();
    
  }
}
