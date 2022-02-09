import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '../../../../../../Santel/ClientApp/src/app/template/base/base.component';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';


@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CityComponent extends BaseComponent {

}

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BankComponent extends BaseComponent {


}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent extends BaseComponent {

  imageModal = false;
  async addImage(e: string) {
    this.imageModal = false;
    let x: any[] = this.selectedForm().controls['Images'].value;
    x.push({ Path: e, Description: '' });
    this.makeItDirty(this.selectedForm());
  }

}
@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvinceComponent extends BaseComponent {


}
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketComponent extends BaseComponent{

}
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransactionComponent extends BaseComponent {


}
@Component({
  selector: 'app-vendee',
  templateUrl: './vendee.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeComponent extends BaseComponent{


}
@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorComponent extends BaseComponent {


  nodes: NzTreeNodeOptions[] = [];
  override async fill() {
    let provinces = this.dataManager.getLoadedData(ProvinceComponent);
    let cities = this.dataManager.getLoadedData(CityComponent);
    this.nodes = provinces.map((c:any) => ({
      label: c.Title,
      value: "_" + c.Id,
      children: cities.filter((d: any) => d.ProvinceId == c.Id).map((d: any) => ({ label: d.Title, value:d.Id, isLeaf:true }))
    }));
  }

  imageModal = false;
  async addImage(e:any) {
    this.imageModal = false;
    let x: any[] = this.selectedForm().controls['Images'].value;
    x.push({ Path: e, Description: '' });
    this.makeItDirty(this.selectedForm());
  }
  logoModal = false;
  async addLogo(e: any) {
    this.logoModal = false;
    let x: any = this.selectedForm().controls['Images'].setValue({ Path: e, Description: '' });
    this.makeItDirty(this.selectedForm());
  }
}
@Component({
  selector: 'app-vendor-bank-account',
  templateUrl: './vendor-bank-account.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorBankAccountComponent extends BaseComponent {
}
@Component({
  selector: 'app-vendor-balance',
  templateUrl: './vendor-balance.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorBalanceComponent extends BaseComponent{


}
@Component({
  selector: 'app-vendor-sell',
  templateUrl: './vendor-sell.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorSellComponent extends BaseComponent {

}

@Component({
  selector: 'app-vendor-withdraw',
  templateUrl: './vendor-withdraw.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorWithdrawComponent extends BaseComponent {

}

