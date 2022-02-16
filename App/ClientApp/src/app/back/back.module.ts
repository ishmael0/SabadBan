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
import { BaseModel, BaseModelWithTitle, defaultPropertyConfiguration, defaultPropertyWithTitleConfiguration } from '../../../../../../Santel/ClientApp/src/app/services/properties';
import { CategoryComponent, VendorComponent, BankComponent, CityComponent, ProvinceComponent, TicketComponent, TransactionComponent, VendeeComponent, VendorBankAccountComponent, VendorSellComponent, VendorBalanceComponent, VendorWithdrawComponent } from './components';

import "reflect-metadata";


export class Category extends BaseModelWithTitle {
  ParentCategoryId: number = 0;
  EnTitle: number = 0;
  Icon: string = '';
  Summary: string = '';
  Description: string = '';
  Priority: number = 0;
  Color: string = '';
  Images: any[] = [];
}
export class Vendor extends BaseModelWithTitle{
  TitleEn: string = '';
  CityId: number = 0;
  Address: string = '';
  PostalCode: string = '';
  ShortDescription: string = '';
  Description: string = '';
  longitude: any;
  latitude: any;
  Phone1: string = '';
  Phone2: string = '';
  CellPhone1: string = '';
  CellPhone2: string = '';
  Images: any[] = [];
  Logo: any;
}
export class VendorSell extends BaseModel{
  Successed = 0;;
  Confirmed = 0;;
  Created = 0;;
  WaitingForPayment = 0;;
  Canceled = 0;
}
export class VendorBankAccount extends BaseModel {
  BankId = 0;
  AccountNumber = '';
  Sheba = '';
  CardNumber = '';
  Priority = 0;
}
export class VendorBalance extends BaseModel{
  VendorId: any;
  Free: any;
  Paid: any;
  Block: any;
}
export class VendorWithdraw extends BaseModel {
  VendorId: any;
  BankId: any;
  Value: any;
  TransActionNumber: any;
  TransActionType: any;
  TransActionDateTime: any;
}
export class Transaction extends BaseModelWithTitle { }
export class Vendee extends BaseModelWithTitle{ }
export class Province extends BaseModelWithTitle { }
export class City extends BaseModelWithTitle {
  ProvinceId: any;
}
export class Bank extends BaseModelWithTitle{
  ShebaValidator = '';
  CardValidator = '';
  AccountNumberValidator = '';
}
export class Ticket extends BaseModelWithTitle { }



export const config: WebSiteConfiguration = new WebSiteConfiguration('DB', 'مدیریت وب سایت ', ' ', [
  //new EntityConfiguration(VendeeComponent, 'داشبورد فروشنده', [], { icon: 'file-tree' }),
  new EntityConfiguration<Category>(Category.name, CategoryComponent, 'دسته بندی', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ParentCategoryId, 'شناسه والد', { value: null, Type: 'number', Validators: [] }),
    new PropertyConfiguration(c => c.EnTitle, 'نام انگلیسی', { value: '', Type: 'number', Validators: [] }),
    new PropertyConfiguration(c => c.Icon, 'آیکون', { value: '', Type: 'number', Validators: [] }),
    new PropertyConfiguration(c => c.Summary, 'توضیحات خلاصه', { value: null, Type: 'string', Validators: [] }),
    new PropertyConfiguration(c => c.Description, 'توضیحات', { value: '', Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c => c.Priority, 'اولویت', { value: 0, Type: 'number', Validators: [] }),
    new PropertyConfiguration(c => c.Color, 'رنگ', { value: '', Type: 'color', Validators: [] }),
    new PropertyConfiguration(c => c.Images, 'تصاویر', { value: [], Type: 'list', Validators: [] }),
  ], { componentType: ComponentTypes.tree, icon: 'file-tree' }),

  new EntityConfiguration<Vendor>(Vendor.name, VendorComponent, 'فروشگاه', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.TitleEn, 'نام لاتین', { Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    //new PropertyConfiguration(c=>c.IsConfirmed', 'تایید شده', { Type:'bool' }),
    //new PropertyConfiguration(c=>c.Categories', 'دسته بندی ها', { Type: 'string', value:[] }),
    new PropertyConfiguration(c => c.CityId, 'شهرستان', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Address, 'آدرس', { value: '', InTable: false }),
    new PropertyConfiguration(c => c.PostalCode, 'کد پستی', { value: '', InTable: false }),

    new PropertyConfiguration(c => c.ShortDescription, 'توضیحات مختصر', { value: '', InTable: false, Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c => c.Description, 'توضیحات', { value: '', InTable: false, Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c => c.longitude, 'طول جغرافیایی', { value: 0, InTable: false }),
    new PropertyConfiguration(c => c.latitude, 'عرض جغرافیایی', { value: 0, InTable: false }),

    new PropertyConfiguration(c => c.Phone1, 'شماره تلفن ثابت اول', { value: '', InTable: false, Validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^0\d{10}/g)*/] }),
    new PropertyConfiguration(c => c.Phone2, 'شماره تلفن ثابت دوم', { value: '', InTable: false, Validators: [Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^0\d{10}/g)*/] }),
    new PropertyConfiguration(c => c.CellPhone1, 'شماره همراه اول', { value: '', InTable: false, Validators: [Validators.minLength(11), Validators.required, Validators.maxLength(11),/* Validators.pattern(/^09[0123]{1}\d{8}/g)*/] }),
    new PropertyConfiguration(c => c.CellPhone2, 'شماره همراه دوم', { value: '', InTable: false, Validators: [Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^09[0123]{1}\d{8}/g)*/] }),


    new PropertyConfiguration(c => c.Images, 'تصاویر فروشگاه', { value: [], InTable: false, Type: 'list', Validators: [] }),
    new PropertyConfiguration(c => c.Logo, 'لوگو فروشگاه', { value: '', InTable: false, Type: 'list', Validators: [] }),

  ], { icon: 'storefront', neededData: [Category, Province, City] }),
  //CreatedReadyToConfirm
  //ConfirmedReadyToSetStatus 
  //ReadyToSend
  //SendingWithPostOffice
  //SendingWithDirectMethod
  //PaidBeforePost
  //Done


  new EntityConfiguration<VendorSell>(VendorSell.name, VendorSellComponent, 'اطلاعات فروش فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.Successed, 'فاکتور موفق', {}),
    new PropertyConfiguration(c => c.Confirmed, 'فاکتور قطعی شده', {}),
    new PropertyConfiguration(c => c.Created, 'فاکتور صادر شده', {}),
    new PropertyConfiguration(c => c.WaitingForPayment, 'فاکتور در انتظار پرداخت', {}),
    new PropertyConfiguration(c => c.Canceled, 'فاکتور باطل شده', {}),
  ], { icon: 'storefront', getTitle: (item: FormGroup) => { return "getTitle" }, neededData: [], componentType: ComponentTypes.lazytable }),
  new EntityConfiguration<VendorBankAccount>(VendorBankAccount.name, VendorBankAccountComponent, 'اطلاعات حساب فروشگاه', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.BankId, 'بانک', {}),
    //new PropertyConfiguration(c=>c.VendorId', 'فروشگاه', {}),
    new PropertyConfiguration(c => c.AccountNumber, 'شماره حساب', { InTable: false }),
    new PropertyConfiguration(c => c.Sheba, 'شماره شبا', { InTable: false }),
    new PropertyConfiguration(c => c.CardNumber, 'شماره کارت', { InTable: false }),
    new PropertyConfiguration(c => c.Priority, 'اولویت', {}),
  ], { icon: 'bank', getTitle: (item: FormGroup) => { let x: string = item.controls['Title'].value; if (!x.isUndefinedOrWhiteSpaces()) { return x; } return "جدید"; }, neededData: [Bank] }),
  new EntityConfiguration<VendorBalance>(VendorBalance.name, VendorBalanceComponent, 'موجودی فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', {}),
    new PropertyConfiguration(c => c.Free, 'آزاد', {}),
    new PropertyConfiguration(c => c.Paid, 'پرداخت شده', {}),
    new PropertyConfiguration(c => c.Block, 'بلاک شده', {}),
  ], {}),
  new EntityConfiguration<VendorWithdraw>(VendorWithdraw.name, VendorWithdrawComponent, 'درخواست وجه فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', {}),
    new PropertyConfiguration(c => c.BankId, 'بانک', {}),
    new PropertyConfiguration(c => c.Value, 'مبلغ', {}),
    new PropertyConfiguration(c => c.TransActionNumber, 'شماره پیگیری', {}),
    new PropertyConfiguration(c => c.TransActionType, 'نوع انتقال', {}),
    new PropertyConfiguration(c => c.TransActionDateTime, 'زمان اتقال', {}),
  ], { neededData: [Bank] }),

  new EntityConfiguration<Transaction>(Transaction.name, TransactionComponent, 'تراکنش', [
  ], { icon: 'transfer' }),
  new EntityConfiguration<Vendee>(Vendee.name, VendeeComponent, 'خریدار', [...defaultPropertyWithTitleConfiguration], { icon: 'cart-outline' }),





  new EntityConfiguration<Province>(Province.name, ProvinceComponent, 'استان', [
    ...defaultPropertyWithTitleConfiguration,
  ], { componentType: ComponentTypes.table }),

  new EntityConfiguration<City>(City.name, CityComponent, 'شهرستان', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ProvinceId, 'استان', {}),
  ], { neededData: [Province], componentType: ComponentTypes.table }),

  new EntityConfiguration<Bank>(Bank.name, BankComponent, 'بانک', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ShebaValidator, 'اعتبار سنج شماره شبا', {}),
    new PropertyConfiguration(c => c.CardValidator, 'اعتبار سنج شماره کارت', {}),
    new PropertyConfiguration(c => c.AccountNumberValidator, 'اعتبار سنج شماره حساب', {}),
  ], { icon:'cash-multiple', componentType: ComponentTypes.table }),
  //new EntityConfiguration(ProductComponent, 'محصول', [], {}),
  //new EntityConfiguration(VendorComponent, '', [], {}),
  new EntityConfiguration<Ticket>(Ticket.name, TicketComponent, 'تیکت ها', [
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




