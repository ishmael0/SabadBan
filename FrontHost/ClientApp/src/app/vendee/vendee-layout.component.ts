import { Component, Directive, OnInit, Injector, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnChanges } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute, ActivatedRouteSnapshot, } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Title } from "@angular/platform-browser";
import { HttpRequestService } from '../http-request';
import { VendeeAuthService } from './vendee-auth';
import { DataService } from '../data.service';
import { HTTPTypes, NZNotificationTypes, RequestPlus } from '../../../../../../Santel/ClientApp/src/app/services/utils';
import { FrontBaseComponent } from '../shared/shared.module';


@Directive()
export class FrontVendeeComponent extends FrontBaseComponent {
  public override setTitle(str: string) {
    super.setTitle(`حساب کاربری ${str}`)
  }
  override async ngOnInit() {
    super.ngOnInit();
  }
}
@Component({
  selector: 'app-vendee-layout',
  templateUrl: './vendee-layout.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeLayoutComponent extends FrontVendeeComponent implements OnDestroy {
  constructor(inject: Injector) {
    super(
      inject.get(FormBuilder),
      inject.get(HttpRequestService),
      inject.get(DomSanitizer),
      inject.get(Title),
      inject.get(VendeeAuthService),
      inject.get(ActivatedRoute),
      inject.get(DataService),
      inject.get(Router),
      inject.get(ChangeDetectorRef)
    );
    if (!this.routerEvent) {
      this.routerEvent = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          if (event.urlAfterRedirects == "/vendee/profile") { this.ds.selectedMenu = 0; }
          if (event.urlAfterRedirects == "/vendee/invoices") { this.ds.selectedMenu = 1; }
          if (event.urlAfterRedirects == "/vendee/transactions") { this.ds.selectedMenu = 2; }
          if (event.urlAfterRedirects == "/vendee/addresses") { this.ds.selectedMenu = 3; }
          if (event.urlAfterRedirects == "/vendee/cards") { this.ds.selectedMenu = 4; }
          if (event.urlAfterRedirects == "/vendee/tickets") { this.ds.selectedMenu = 5; }
        }
      });
    }

  }
  routerEvent!: Subscription;
  ngOnDestroy() {
    this.routerEvent.unsubscribe();
  }
}



@Component({
  selector: 'app-vendee-transactions',
  templateUrl: './vendee-transactions.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeTransactionsComponent extends FrontVendeeComponent {
  override async ngOnInit() {
    super.setTitle("تراکنش ها");
  }
}
@Component({
  selector: 'app-vendee-profile',
  templateUrl: './vendee-profile.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeProfileComponent extends FrontVendeeComponent {
  override async ngOnInit() {
    super.setTitle("پروفایل");
  }




}
@Component({
  selector: 'app-vendee-invoices',
  templateUrl: './vendee-invoices.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeInvoicesComponent extends FrontVendeeComponent {
  async get() {
    await this.http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'Data', {
      action: 'GetInvoices',
      onSuccess: (m, d) => {
        console.log(d);
        this.ds.Invoices = d;
        this.http.createNotification(NZNotificationTypes.success, "دریافت شد", "لیست فاکتور ها با موفقیت دریافت شد.")
        this.cdr.detectChanges();
      },
      onError: (m, d) => {
        this.http.createNotification(NZNotificationTypes.error, "خطا", "دریافت لیست فاکتور ها با خطا مواجه شد.")
      },
    }))
  }
  async refresh() {
    await this.get();
  }
  override async ngOnInit() {
    super.ngOnInit();
    super.setTitle("فاکتور ها");
  }
  //list: any[] = []
  openInvoice(item: any) {
    localStorage.setItem(`invoice${item.Id}`, item)
    this.openInNewWindow(`/vendee/invoice/${item.Id}`)
  }
  selectedItem: any = {};
  dis = false;
}
@Component({
  selector: 'app-vendee-addresses',
  templateUrl: './vendee-addresses.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeAddressesComponent extends FrontVendeeComponent {
  override async ngOnInit() {
    super.ngOnInit();
    super.setTitle("آدرس ها");
  }
}
@Component({
  selector: 'app-vendee-ticket',
  templateUrl: './vendee-ticket.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeTicketComponent extends FrontVendeeComponent {
  override async ngOnInit() {
    super.setTitle("تیکت های پشتیبانی");
  }

}
@Component({
  selector: 'app-vendee-cards',
  templateUrl: './vendee-cards.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeCardsComponent extends FrontVendeeComponent {
  override async ngOnInit() {
    super.setTitle("کارت ها");
  }
}
