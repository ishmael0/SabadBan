import { NgModule } from '@angular/core';
import { buildPath, buildPathFromConfig, TemplateModule } from '../../../../../../Santel/ClientApp/src/app/template/template.module';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTypes, EntityConfiguration, PropertyConfiguration, WebSiteConfiguration } from '../../../../../../Santel/ClientApp/src/app/services/utils';
import { AuthService } from '../../../../../../Santel/ClientApp/src/app/services/auth.service';
import { WebSiteService } from '../../../../../../Santel/ClientApp/src/app/services/website.service';
import { Validators, FormGroup } from '@angular/forms';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileManagerComponent } from '../../../../../../Santel/ClientApp/src/app/template/components/file-manager/file-manager.component';
import { IconsComponent } from '../../../../../../Santel/ClientApp/src/app/template/components/icons/icons.component';
import { defaultPropertyConfiguration, defaultPropertyWithTitleConfiguration } from '../../../../../../Santel/ClientApp/src/app/services/properties';
import { CategoryComponent, VendorComponent, BankComponent, CityComponent, ProvinceComponent, TicketComponent, TransactionComponent, VendeeComponent, VendorBankAccountComponent, VendorSellComponent, VendorBalanceComponent, VendorWithdrawComponent } from './components';

import "reflect-metadata";


export class Category {
  ParentCategoryId: number = 0;
  EnTitle: number = 0;
  Icon: string = '';
  Summary: string = '';
  Description: string = '';
  Priority: number = 0;
  Color: string = '';
  Images: any[] = [];
}
export class Vendor {
  TitleEn: any;
  CityId: any;
  Address: any;
  PostalCode: any;
  ShortDescription: any;
  Description: any;
  longitude: any;
  latitude: any;
  Phone1: any;
  Phone2: any;
  CellPhone1: any;
  CellPhone2: any;
  Images: any;
  Logo: any;
}
export class VendorSell {
  Successed: any;
  Confirmed: any;
  Created: any;
  WaitingForPayment: any;
  Canceled: any;
}
export class VendorBankAccount {
  BankId: any;
  AccountNumber: any;
  Sheba: any;
  CardNumber: any;
  Priority: any;
}
export class VendorBalance {
  VendorId: any;
  Free: any;
  Paid: any;
  Block: any;
}
export class VendorWithdraw {
  VendorId: any;
  BankId: any;
  Value: any;
  TransActionNumber: any;
  TransActionType: any;
  TransActionDateTime: any;
}
export class Transaction { }
export class Vendee { }
export class Province { }
export class City {
  ProvinceId: any;
}
export class Bank { }
export class Ticket { }



export const config: WebSiteConfiguration = new WebSiteConfiguration('DB', 'مدیریت وب سایت ', ' ', [
  //new EntityConfiguration(VendeeComponent, 'داشبورد فروشنده', [], { icon: 'file-tree' }),
  new EntityConfiguration<Category>(Category.name,CategoryComponent, 'دسته بندی', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ParentCategoryId, 'شناسه والد', { value: null, Type: 'number', Validators: [] }),
    new PropertyConfiguration(c=>c.EnTitle, 'نام انگلیسی', { value: '', Type: 'number', Validators: [] }),
    new PropertyConfiguration(c=>c.Icon, 'آیکون', { value: '', Type: 'number', Validators: [] }),
    new PropertyConfiguration(c=>c.Summary, 'توضیحات خلاصه', { value: null, Type: 'string', Validators: [] }),
    new PropertyConfiguration(c=>c.Description, 'توضیحات', { value: '', Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c=>c.Priority, 'اولویت', { value: 0, Type: 'number', Validators: [] }),
    new PropertyConfiguration(c=>c.Color, 'رنگ', { value: '', Type: 'color', Validators: [] }),
    new PropertyConfiguration(c=>c.Images, 'تصاویر', { value: [], Type: 'list', Validators: [] }),
  ], { componentType: ComponentTypes.tree, icon: 'file-tree' }),

  new EntityConfiguration<Vendor>(Vendor.name,VendorComponent, 'فروشگاه', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c=>c.TitleEn, 'نام لاتین', { Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    //new PropertyConfiguration(c=>c.IsConfirmed', 'تایید شده', { Type:'bool' }),
    //new PropertyConfiguration(c=>c.Categories', 'دسته بندی ها', { Type: 'string', value:[] }),
    new PropertyConfiguration(c=>c.CityId, 'شهرستان', { Validators: [Validators.required] }),
    new PropertyConfiguration(c=>c.Address, 'آدرس', { value: '', InTable: false }),
    new PropertyConfiguration(c=>c.PostalCode, 'کد پستی', { value: '', InTable: false }),

    new PropertyConfiguration(c=>c.ShortDescription, 'توضیحات مختصر', { value: '', InTable: false, Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c=>c.Description, 'توضیحات', { value: '', InTable: false, Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c=>c.longitude, 'طول جغرافیایی', { value: 0, InTable: false }),
    new PropertyConfiguration(c=>c.latitude, 'عرض جغرافیایی', { value: 0, InTable: false }),

    new PropertyConfiguration(c=>c.Phone1, 'شماره تلفن ثابت اول', { value: '', InTable: false, Validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^0\d{10}/g)*/] }),
    new PropertyConfiguration(c=>c.Phone2, 'شماره تلفن ثابت دوم', { value: '', InTable: false, Validators: [Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^0\d{10}/g)*/] }),
    new PropertyConfiguration(c=>c.CellPhone1, 'شماره همراه اول', { value: '', InTable: false, Validators: [Validators.minLength(11), Validators.required, Validators.maxLength(11),/* Validators.pattern(/^09[0123]{1}\d{8}/g)*/] }),
    new PropertyConfiguration(c=>c.CellPhone2, 'شماره همراه دوم', { value: '', InTable: false, Validators: [Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^09[0123]{1}\d{8}/g)*/] }),


    new PropertyConfiguration(c=>c.Images, 'تصاویر فروشگاه', { value: [], InTable: false, Type: 'list', Validators: [] }),
    new PropertyConfiguration(c=>c.Logo, 'لوگو فروشگاه', { value: '', InTable: false, Type: 'list', Validators: [] }),

  ], { icon: 'storefront', neededData: [CategoryComponent, ProvinceComponent, CityComponent] }),
  //CreatedReadyToConfirm
  //ConfirmedReadyToSetStatus 
  //ReadyToSend
  //SendingWithPostOffice
  //SendingWithDirectMethod
  //PaidBeforePost
  //Done


new EntityConfiguration<VendorSell>(VendorSell.name,VendorSellComponent, 'اطلاعات فروش فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c=>c.Successed, 'فاکتور موفق', {}),
    new PropertyConfiguration(c=>c.Confirmed, 'فاکتور قطعی شده', {}),
    new PropertyConfiguration(c=>c.Created, 'فاکتور صادر شده', {}),
    new PropertyConfiguration(c=>c.WaitingForPayment, 'فاکتور در انتظار پرداخت', {}),
    new PropertyConfiguration(c=>c.Canceled, 'فاکتور باطل شده', {}),
  ], { icon: 'storefront', getTitle: (item: FormGroup) => { return "getTitle" }, neededData: [], componentType: ComponentTypes.lazytable }),
  new EntityConfiguration<VendorBankAccount>(VendorBankAccount.name,VendorBankAccountComponent, 'اطلاعات حساب فروشگاه', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c=>c.BankId, 'بانک', {}),
    //new PropertyConfiguration(c=>c.VendorId', 'فروشگاه', {}),
    new PropertyConfiguration(c=>c.AccountNumber, 'شماره حساب', { InTable: false }),
    new PropertyConfiguration(c=>c.Sheba, 'شماره شبا', { InTable: false }),
    new PropertyConfiguration(c=>c.CardNumber, 'شماره کارت', { InTable: false }),
    new PropertyConfiguration(c=>c.Priority, 'اولویت', {}),
  ], { icon: 'bank', getTitle: (item: FormGroup) => { let x: string = item.controls['Title'].value; if (!x.isUndefinedOrWhiteSpaces()) { return x; } return "جدید"; }, neededData: [BankComponent] }),
  new EntityConfiguration<VendorBalance>(VendorBalance.name,VendorBalanceComponent, 'موجودی فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c=>c.VendorId, 'فروشگاه', {}),
    new PropertyConfiguration(c=>c.Free, 'آزاد', {}),
    new PropertyConfiguration(c=>c.Paid, 'پرداخت شده', {}),
    new PropertyConfiguration(c=>c.Block, 'بلاک شده', {}),
  ], {}),
  new EntityConfiguration<VendorWithdraw>(VendorWithdraw.name,VendorWithdrawComponent, 'درخواست وجه فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c=>c.VendorId, 'فروشگاه', {}),
    new PropertyConfiguration(c=>c.BankId, 'بانک', {}),
    new PropertyConfiguration(c=>c.Value, 'مبلغ', {}),
    new PropertyConfiguration(c=>c.TransActionNumber, 'شماره پیگیری', {}),
    new PropertyConfiguration(c=>c.TransActionType, 'نوع انتقال', {}),
    new PropertyConfiguration(c=>c.TransActionDateTime, 'زمان اتقال', {}),
  ], { neededData: [BankComponent] }),

  new EntityConfiguration<Transaction>(Transaction.name,TransactionComponent, 'تراکنش', [
  ], { icon: 'transfer' }),
  new EntityConfiguration<Vendee>(Vendee.name,VendeeComponent, 'خریدار', [...defaultPropertyWithTitleConfiguration], { icon: 'cart-outline' }),





  new EntityConfiguration<Province>(Province.name,ProvinceComponent, 'استان', [
    ...defaultPropertyWithTitleConfiguration,
  ], { componentType: ComponentTypes.table }),

  new EntityConfiguration<City>(City.name,CityComponent, 'شهرستان', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c=>c.ProvinceId, 'استان', {}),
  ], { neededData: [ProvinceComponent], componentType: ComponentTypes.table }),

  new EntityConfiguration<Bank>(Bank.name,BankComponent, 'بانک', [], { componentType: ComponentTypes.lazytable }),
  //new EntityConfiguration(ProductComponent, 'محصول', [], {}),
  //new EntityConfiguration(VendorComponent, '', [], {}),
  new EntityConfiguration<Ticket>(Ticket.name,TicketComponent, 'تیکت ها', [
    ...defaultPropertyWithTitleConfiguration,
  ], {}),
]);

@NgModule({
  declarations: [
    CategoryComponent,
    VendorComponent,
    VendorSellComponent,
    VendorBankAccountComponent,
    VendorBalanceComponent,
    ProvinceComponent,
    CityComponent,
    BankComponent,
    TransactionComponent,
    VendeeComponent,
    TicketComponent,
    VendorWithdrawComponent
  ],
  imports: [
    TemplateModule,
    //CKEditorModule,
    RouterModule.forChild(buildPathFromConfig(config))
  ]
})
export class BackModule {
  constructor(wss: WebSiteService) {
    wss.websites.push(config);
    wss.selectedWebsite = config;
  }
}




