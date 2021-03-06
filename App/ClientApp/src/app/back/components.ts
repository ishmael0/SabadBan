import { Component, OnInit, ChangeDetectionStrategy, Injector } from '@angular/core';
import { BaseComponent } from '../../../../../../Santel/ClientApp/src/app/template/base/base.component';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { getNameOf, HTTPTypes, numberToText, RequestPlus } from '../../../../../../Santel/ClientApp/src/app/services/utils';
import { Bank, Category, City, Invoice, InvoiceDetail, Province, Ticket, Transaction, Vendee, Vendor, VendorBalance, VendorBankAccount, VendorDetail, VendorWithdraw } from './back.module';







@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityComponent extends BaseComponent<City> {
}





@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent extends BaseComponent<Invoice> {
  selectVendorModal = false;
  selectVendeeModal = false;
  override async onNewObjectAdded(temp: FormGroup, t: Invoice) {
    super.onNewObjectAdded(temp, t);
    temp.addControl(getNameOf<Invoice>(c => c.Vendee), new FormControl(t.Vendee))
    temp.addControl(getNameOf<Invoice>(c => c.Vendor), new FormControl(t.Vendor))
    temp.getControlByName((c: Invoice) => c.InvoiceDetails).setValue(this.ttt.InvoiceDetails);
  }
  vendorModalSelected(e: Vendor) {
    this.selectedForm().form.getControlByName<Invoice>(c => c.Vendor).setValue(e);
    this.selectedForm().form.getControlByName<Invoice>(c => c.VendorId).setValue(e.Id);
    this.selectVendorModal = false;
    this.makeItDirty(this.selectedForm().form)
  }
  vendeeModalSelected(e: Vendee) {
    this.selectedForm().form.getControlByName<Invoice>(c => c.Vendee).setValue(e);
    this.selectedForm().form.getControlByName<Invoice>(c => c.VendeeId).setValue(e.Id);
    this.selectVendeeModal = false;
    this.makeItDirty(this.selectedForm().form)
  }


  canEditInvoice(item: any) {
    return true
  }
  TotalPrice(itemc: InvoiceDetail[]) {
    return itemc.reduce((p, c: InvoiceDetail) => p + c.Price * c.Count, 0)
  }
  addRowToInvoice(item: FormGroup) {
    item.getControlByName((c: Invoice) => c.InvoiceDetails).setValue([...item.getControlByName((c: Invoice) => c.InvoiceDetails).value, { Count: 0, Price: 0 }]);
    this.makeItDirty(item);
    this.cdr.detectChanges();

  }
  ttt: Invoice = new Invoice({
    Discount: 5,
    Vendor: new Vendor({ Title: 'sadsa' }),
    Vendee: new Vendee({ FirstName: '??????????', LastName: '??????????', CellPhone: '09016200321' }),
    InvoiceDetails: [
      new InvoiceDetail({ Count: 2, Price: 100000, Description: 'ghhh', Title: '???????????? ?????????? ?????????? ???? ????' }),
      new InvoiceDetail({ Count: 1, Price: 200000, Description: 'ghhh', Title: '???????????? ?????????? ?????????? ???? ????' }),
      new InvoiceDetail({ Count: 1, Price: 200000, Description: 'ghhh', Title: '???????????? ?????????? ?????????? ???? ????' }),
      new InvoiceDetail({ Count: 1, Price: 200000, Description: 'ghhh', Title: '???????????? ?????????? ?????????? ???? ????' }),
      new InvoiceDetail({ Count: 1, Price: 200000, Description: 'ghhh', Title: '???????????? ?????????? ?????????? ???? ????' }),
      new InvoiceDetail({ Count: 1, Price: 200000, Description: 'ghhh', Title: '???????????? ?????????? ?????????? ???? ????' }),
      new InvoiceDetail({ Count: 1, Price: 200000, Description: 'ghhh', Title: '???????????? ?????????? ?????????? ???? ????' }),
      new InvoiceDetail({ Count: 1, Price: 200000, Description: 'ghhh', Title: '???????????? ?????????? ?????????? ???? ????' }),
    ]
  })


  opts = [
    { Id: 0, Title: '????????????', Price: 0 },
    { Id: 0, Title: '?????????? ???? ?????? ???????? ????????', PaymentSterategy: '' },
    { Id: 1, Title: '?????????? ???? ??????' },
    { Id: 3, Title: '???????? ???????? ???? ??????????(???????? ????????????)' },
    { Id: 4, Title: '?????????? ??????????' },

  ];

}

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankComponent extends BaseComponent<Bank> {

}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent extends BaseComponent<Category> {
  imageModal = false;
  async addImage(e: string) {
    this.imageModal = false;
    let x: any[] = this.selectedForm().form.controls['Images'].value;
    x.push({ Path: e, Description: '' });
    this.makeItDirty(this.selectedForm().form);
  }

}
@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvinceComponent extends BaseComponent<Province> {

}
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketComponent extends BaseComponent<Ticket> {
}
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent extends BaseComponent<Transaction> {

}
@Component({
  selector: 'app-vendee',
  templateUrl: './vendee.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeComponent extends BaseComponent<Vendee> {
}
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorComponent extends BaseComponent<Vendor> {
  nodes: NzTreeNodeOptions[] = [];
  cities: any[] = [];
  override async fill() {
    let provinces = this.dataManager.getLoadedData(Province);
    this.cities = this.dataManager.getLoadedData(City);
    this.nodes = provinces.map((c: any) => ({
      title: c.Title,
      key: "_" + c.Id,
      selectable: false,
      children: this.cities.filter((d: any) => d.ProvinceId == c.Id).map((d: any) => ({ title: d.Title, key: d.Id, isLeaf: true }))
    }));
  }
  override onGet(m: string[], d: any) {
    super.onGet(m, d);
    d.Records.forEach((e: any) => { e.CityTitle = this.cities.find(c => c.Id == e.CityId)?.Title });
  }
  imageModal = false;
  async addImage(item: FormGroup, e: string) {
    this.imageModal = false;
    let x: any[] = item.getControlByName<Vendor>(c => c.Images).value;
    x.push({ Path: e, Description: '' });
    item.getControlByName<Vendor>(c => c.Images).setValue(x);
    this.makeItDirty(item);
  }
  logoModal = false;
  async addLogo(item: FormGroup, e: string) {
    this.logoModal = false;
    let x: any = item.getControlByName<Vendor>(c => c.Logo).setValue(e);
    this.makeItDirty(item);
  }
  async ConfirmVendor(item: any) {
    this.http.AddAndTry(new RequestPlus(HTTPTypes.GET, this.dataManager.key, {
      params: { Id: item.Id },
      action: 'BuildVendor', onSuccess: (m: string[], d: any) => {
      }
    }))
    //releaseEvents
  }
}
@Component({
  selector: 'app-vendor-bank-account',
  templateUrl: './vendor-bank-account.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorBankAccountComponent extends BaseComponent<VendorBankAccount> {
  banks: Bank[] = [];
  override async fill() {
    this.banks = this.dataManager.getLoadedData(Bank);
  }
}
@Component({
  selector: 'app-vendor-balance',
  templateUrl: './vendor-balance.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorBalanceComponent extends BaseComponent<VendorBalance> {
  override async fill() {
    let banks = this.dataManager.getLoadedData(Bank);
    console.log(banks)
  }
}
@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorDetailComponent extends BaseComponent<VendorDetail> {
}

@Component({
  selector: 'app-vendor-withdraw',
  templateUrl: './vendor-withdraw.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorWithdrawComponent extends BaseComponent<VendorWithdraw> {
}

@Component({
  selector: 'app-vendor-comment',
  templateUrl: './vendor-comment.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorCommentComponent extends BaseComponent<VendorWithdraw> {
}

