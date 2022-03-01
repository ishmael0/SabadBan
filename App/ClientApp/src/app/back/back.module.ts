import { NgModule } from '@angular/core';
import { buildPath, buildPathFromConfig, TemplateModule } from '../../../../../../Santel/ClientApp/src/app/template/template.module';
import { RouterModule, Routes } from '@angular/router';
import { ComponentTypes, EntityConfiguration, getNameOf, isUndefinedOrWhiteSpaces, PropertyConfiguration, WebSiteConfiguration } from '../../../../../../Santel/ClientApp/src/app/services/utils';
import { AuthService } from '../../../../../../Santel/ClientApp/src/app/services/auth.service';
import { WebSiteService } from '../../../../../../Santel/ClientApp/src/app/services/website.service';
import { Validators, FormGroup } from '@angular/forms';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileManagerComponent } from '../../../../../../Santel/ClientApp/src/app/template/components/file-manager/file-manager.component';
import { IconsComponent } from '../../../../../../Santel/ClientApp/src/app/template/components/icons/icons.component';
import { BaseModel, BaseModelWithTitle, defaultPropertyConfiguration, defaultPropertyWithTitleConfiguration } from '../../../../../../Santel/ClientApp/src/app/services/properties';
import { CategoryComponent, VendorComponent, BankComponent, CityComponent, ProvinceComponent, TicketComponent, TransactionComponent, VendeeComponent, VendorBankAccountComponent, VendorSellComponent, VendorBalanceComponent, VendorWithdrawComponent, InvoiceComponent } from './components';

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
export class Vendor extends BaseModelWithTitle {
  constructor(p?: Partial<Vendor>) {
    super();
    if (p)
      Object.assign(this, p);
  }
  TitleEn: string = '';
  CityId!: number;
  LastName: any;
  FirstName: any;
  Address: string = '';
  PostalCode: string = '';
  ShortDescription: string = '';
  Description: string = '';
  longitude = 0;
  latitude = 0;
  Phone1: string = '';
  Phone2: string = '';
  CellPhone1: string = '';
  CellPhone2: string = '';
  Images: any[] = [];
  Logo: any;
  MelliCode = '';
  CellPhone2Confirm = false;
  Phone1Confirm = false;
  Phone2Confirm = false;
  CellPhone1Confirm = false;
}
export class VendorSell extends BaseModel {
  Successed = 0;
  VendorId!: number;
  Confirmed = 0;;
  Created = 0;;
  WaitingForPayment = 0;;
  Canceled = 0;
}
export class VendorBankAccount extends BaseModel {
  BankId!: number;
  VendorId!: number;
  Sheba = '';
  Priority = 0;
}
export class VendorBalance extends BaseModel {
  VendorId!: number;
  Free: any;
  Paid: any;
  Block: any;
}
export class VendorWithdraw extends BaseModel {
  Value: number = 0;
  Number = 0;
  Type = 0;
  DateTime = '';
  VendorBankAccountId!: number;
}
export class Transaction extends BaseModelWithTitle { }
export class Address {
  PostalCode = '';
  Title = '';
  CityId!: number;
  FullAddress = '';
  Latitude = 0;
  Longitude = 0;
}
export class Vendee extends BaseModel {
  constructor(p?: Partial<Vendee>) {
    super();
    if (p) Object.assign(this, p);
  }
  FirstName = '';
  LastName = '';
  CellPhone = '';
  MelliCode = '';
  Password = '';
  Addresses: Address[] = [];
  CellPhoneConfirm = false;
}
export class Province extends BaseModelWithTitle { }
export class City extends BaseModelWithTitle {
  ProvinceId: any;
}
export class Bank extends BaseModelWithTitle {
  ShebaValidator = '';
  CardValidator = '';
  AccountNumberValidator = '';
}
export class Ticket extends BaseModelWithTitle { }
export class InvoiceDetail {
  constructor(p?: Partial<InvoiceDetail>) {
    if (p) Object.assign(this, p);
  }
  Title = '';
  Description = '';
  Price = 0;
  Count = 0;
  get TotalPrice() { return this.Price * this.Count; }
  InvoiceState: any
}
export class Invoice extends BaseModel {
  constructor(p?: Partial<Invoice>) {
    super();
    if (p)
      Object.assign(this, p);
  }
  VendeeId!: number;
  Vendee: Vendee = new Vendee();
  VendorId!: number;
  Vendor: Vendor = new Vendor();
  Options: any = {};
  Discount = 0;
  get TotalPrice() { return this.InvoiceDetails.reduce((p, c) => p + c.TotalPrice, 0) };
  InvoiceDetails: InvoiceDetail[] = [];
}



export const config: WebSiteConfiguration = new WebSiteConfiguration('DB', 'مدیریت وب سایت ', ' ', [
  //new EntityConfiguration(VendeeComponent, 'داشبورد فروشنده', [], { icon: 'file-tree' }),
  new EntityConfiguration<Category>(Category, CategoryComponent, 'دسته بندی', [
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

  new EntityConfiguration<Vendor>(Vendor, VendorComponent, 'فروشگاه', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.TitleEn, 'نام لاتین', { Type: 'string', InPicker: true, Validators: [Validators.required, Validators.minLength(3)] }),
    //new PropertyConfiguration(c=>c.IsConfirmed', 'تایید شده', { Type:'bool' }),
    //new PropertyConfiguration(c=>c.Categories', 'دسته بندی ها', { Type: 'string', value:[] }),
    new PropertyConfiguration(c => c.CityId, 'شهرستان', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Address, 'آدرس', { value: '', InTable: false }),
    new PropertyConfiguration(c => c.PostalCode, 'کد پستی', { value: '', InTable: false }),
    new PropertyConfiguration(c => c.FirstName, 'نام', { InTable: false }),
    new PropertyConfiguration(c => c.LastName, 'نام خانوادگی', { InTable: false }),
    new PropertyConfiguration(c => c.MelliCode, 'کد ملی', { InTable: false, Validators: [Validators.required, Validators.maxLength(10), Validators.minLength(10)] }),
    new PropertyConfiguration(c => c.ShortDescription, 'توضیحات مختصر', { value: '', InTable: false, Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c => c.Description, 'توضیحات', { value: '', InTable: false, Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c => c.longitude, 'طول جغرافیایی', { value: 0, InTable: false }),
    new PropertyConfiguration(c => c.latitude, 'عرض جغرافیایی', { value: 0, InTable: false }),

    new PropertyConfiguration(c => c.Phone1, 'شماره تلفن ثابت اول', { InTable: false, Validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^0\d{10}/g)*/] }),
    new PropertyConfiguration(c => c.Phone2, 'شماره تلفن ثابت دوم', { InTable: false, Validators: [Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^0\d{10}/g)*/] }),
    new PropertyConfiguration(c => c.CellPhone1, 'شماره همراه اول', { InTable: false, Validators: [Validators.minLength(11), Validators.required, Validators.maxLength(11),/* Validators.pattern(/^09[0123]{1}\d{8}/g)*/] }),
    new PropertyConfiguration(c => c.CellPhone2, 'شماره همراه دوم', { InTable: false, Validators: [Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^09[0123]{1}\d{8}/g)*/] }),


    new PropertyConfiguration(c => c.Phone1Confirm, 'تایید شماره تلفن ثابت اول', { InTable: false, Validators: [Validators.required, Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^0\d{10}/g)*/] }),
    new PropertyConfiguration(c => c.Phone2Confirm, 'تایید شماره تلفن ثابت دوم', { InTable: false, Validators: [Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^0\d{10}/g)*/] }),
    new PropertyConfiguration(c => c.CellPhone1Confirm, 'تایید شماره همراه اول', { InTable: false, Validators: [Validators.minLength(11), Validators.required, Validators.maxLength(11),/* Validators.pattern(/^09[0123]{1}\d{8}/g)*/] }),
    new PropertyConfiguration(c => c.CellPhone2Confirm, 'تایید شماره همراه دوم', { InTable: false, Validators: [Validators.minLength(11), Validators.maxLength(11)/*, Validators.pattern(/^09[0123]{1}\d{8}/g)*/] }),


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


  new EntityConfiguration<VendorSell>(VendorSell, VendorSellComponent, 'اطلاعات فروش فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Successed, 'فاکتور موفق', {}),
    new PropertyConfiguration(c => c.Confirmed, 'فاکتور قطعی شده', {}),
    new PropertyConfiguration(c => c.Created, 'فاکتور صادر شده', {}),
    new PropertyConfiguration(c => c.WaitingForPayment, 'فاکتور در انتظار پرداخت', {}),
    new PropertyConfiguration(c => c.Canceled, 'فاکتور باطل شده', {}),
  ], { icon: 'storefront', canAdd: false, canDelete: false, getTitle: (item: FormGroup) => { return "getTitle" }, neededData: [], componentType: ComponentTypes.lazytable }),
  new EntityConfiguration<VendorBalance>(VendorBalance, VendorBalanceComponent, 'موجودی حساب فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Free, 'آزاد', {}),
    new PropertyConfiguration(c => c.Paid, 'پرداخت شده', {}),
    new PropertyConfiguration(c => c.Block, 'بلاک شده', {}),
  ], { icon: 'bank', canAdd: false, canDelete: false, getTitle: (item: FormGroup) => { return item.controls['Title']?.value ?? "جدید"; } }),
  new EntityConfiguration<VendorBankAccount>(VendorBankAccount, VendorBankAccountComponent, 'حساب بانکی فروشگاه', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.BankId, 'بانک', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Sheba, 'شماره شبا', { InTable: false }),
    new PropertyConfiguration(c => c.Priority, 'اولویت', {}),
  ], { icon: 'bank', getTitle: (item: FormGroup) => { return item.controls['Title']?.value ?? "جدید"; }, neededData: [Bank] }),
  new EntityConfiguration<VendorWithdraw>(VendorWithdraw, VendorWithdrawComponent, 'درخواست وجه فروشگاه', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendorBankAccountId, 'حساب', {}),
    new PropertyConfiguration(c => c.Value, 'مبلغ', {}),
    new PropertyConfiguration(c => c.Number, 'شماره پیگیری', {}),
    new PropertyConfiguration(c => c.Type, 'نوع انتقال', {}),
    new PropertyConfiguration(c => c.DateTime, 'زمان اتقال', {}),
  ], { neededData: [Bank], canAdd: false, canDelete: false, getTitle: (item: FormGroup) => { return item.controls['Title']?.value ?? "جدید"; } }),






  new EntityConfiguration<Vendee>(Vendee, VendeeComponent, 'خریدار', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.FirstName, 'نام', { InPicker:true }),
    new PropertyConfiguration(c => c.LastName, 'نام خانوادگی', { InPicker: true}),
    new PropertyConfiguration(c => c.CellPhone, 'شماره تماس', { InPicker: true}),
    new PropertyConfiguration(c => c.CellPhoneConfirm, 'تایید شماره تماس', {}),
    new PropertyConfiguration(c => c.MelliCode, 'کد ملی', { Validators: [Validators.required, Validators.maxLength(10), Validators.minLength(10)] }),
    new PropertyConfiguration(c => c.Password, 'پسورد', {}),
    new PropertyConfiguration(c => c.Addresses, 'آدرس', { InTable: false, InSearch: false }),
  ], { icon: 'cart-outline', getTitle: (item: FormGroup) => { return (item.controls['FirstName']?.value ?? "جدید") + " " + (item.controls['LastName']?.value ?? "جدید"); } }),





  new EntityConfiguration<Province>(Province, ProvinceComponent, 'استان', [
    ...defaultPropertyWithTitleConfiguration,
  ], { componentType: ComponentTypes.table }),

  new EntityConfiguration<City>(City, CityComponent, 'شهرستان', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ProvinceId, 'استان', {}),
  ], { neededData: [Province], componentType: ComponentTypes.table }),

  new EntityConfiguration<Bank>(Bank, BankComponent, 'بانک', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ShebaValidator, 'اعتبار سنج شماره شبا', {}),
    new PropertyConfiguration(c => c.CardValidator, 'اعتبار سنج شماره کارت', {}),
    new PropertyConfiguration(c => c.AccountNumberValidator, 'اعتبار سنج شماره حساب', {}),
  ], { icon: 'cash-multiple', componentType: ComponentTypes.table }),
  //new EntityConfiguration(ProductComponent, 'محصول', [], {}),
  //new EntityConfiguration(VendorComponent, '', [], {}),
  new EntityConfiguration<Invoice>(Invoice, InvoiceComponent, 'فاکتور ها', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendeeId, 'خریدار', { canEdit: false, Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', { canEdit: false, Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Discount, 'تخففیف روی کل فاکتور', { InTable: false, Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.InvoiceDetails, 'جزییات فاکتور', { InTable: false }),
    new PropertyConfiguration(c => c.Options, ' سایر تنظیمات', { InTable: false }),
  ], { getTitle: (item: FormGroup) => { return (item.controls[getNameOf<Invoice>(c => c.VendeeId)]?.value?.toString() ?? "جدید"); } }),
  new EntityConfiguration<Ticket>(Ticket, TicketComponent, 'تیکت ها', [
    ...defaultPropertyWithTitleConfiguration,
  ], {}),
  new EntityConfiguration<Transaction>(Transaction, TransactionComponent, 'تراکنش', [
  ], { icon: 'transfer' }),

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
    VendorWithdrawComponent,
    InvoiceComponent
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




