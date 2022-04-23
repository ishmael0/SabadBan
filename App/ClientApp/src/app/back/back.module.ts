import { NgModule } from '@angular/core';
import { buildPath, buildPathFromConfig, TemplateModule } from '../../../../../../Santel/ClientApp/src/app/template/template.module';
import { RouterModule, Routes } from '@angular/router';
import { BaseModel, BaseModelWithTitle, ComponentTypes, EntityConfiguration, getNameOf, isUndefinedOrWhiteSpaces, PropertyConfiguration, Status, WebSiteConfiguration } from '../../../../../../Santel/ClientApp/src/app/services/utils';
import { AuthService } from '../../../../../../Santel/ClientApp/src/app/services/auth.service';
import { WebSiteService } from '../../../../../../Santel/ClientApp/src/app/services/website.service';
import { Validators, FormGroup } from '@angular/forms';
//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileManagerComponent } from '../../../../../../Santel/ClientApp/src/app/template/components/file-manager/file-manager.component';
import { IconsComponent } from '../../../../../../Santel/ClientApp/src/app/template/components/icons/icons.component';
import { ActiveStatus, defaultPropertyConfiguration, defaultPropertyWithTitleConfiguration, DeletedStatus, FullStatuses, PublishedStatus } from '../../../../../../Santel/ClientApp/src/app/services/properties';
import { CategoryComponent, VendorComponent, BankComponent, CityComponent, ProvinceComponent, TicketComponent, TransactionComponent, VendeeComponent, VendorBankAccountComponent, VendorDetailComponent, VendorBalanceComponent, VendorWithdrawComponent, InvoiceComponent } from './components';

import "reflect-metadata";



export class Category extends BaseModelWithTitle {
  ParentCategoryId: number | undefined = undefined;
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
  Logo = '';
  MelliCode = '';
  CellPhone2Confirm = false;
  Phone1Confirm = false;
  Phone2Confirm = false;
  CellPhone1Confirm = false;
}
export class VendorDetail extends BaseModel {
  Successed = 0;
  VendorId!: number;
  Confirmed = 0;;
  Created = 0;;
  WaitingForPayment = 0;;
  Canceled = 0;

  Rank = 0;


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


export const InvoiceStatus: Status[] = [{ Icon: '', Color: '', Value: 2, Title: 'ثب شده(غیر قابل تغییر)' },
{ Icon: '', Color: '', Value: 3, Title: 'در انتظار پرداخت توسط خریدار' },
{ Icon: '', Color: '', Value: 4, Title: 'پرداخت شده توسط خریدار در انتظار ارسال توسط فروشنده' },
{ Icon: '', Color: '', Value: 5, Title: 'ارسال شده در انتظار تایید توسط خریدار' },
{ Icon: '', Color: '', Value: 6, Title: 'تایید شده توسط خریدار' },
{ Icon: '', Color: '', Value: 7, Title: 'فاکتور پایان یافته' }]

export class Invoice extends BaseModel {
  PostType: any;
  constructor(p?: Partial<Invoice>) {
    super();
    if (p)
      Object.assign(this, p);
  }
  VendeeId!: number;
  Vendee: Vendee = new Vendee();
  VendorId!: number;
  Vendor: Vendor = new Vendor();
  Discount = 0;
  PaymentType = 0;
  PostCost = 0;
  Description = 0;
  get TotalPrice() { return this.InvoiceDetails.reduce((p, c) => p + c.TotalPrice, 0) };
  InvoiceDetails: InvoiceDetail[] = [];
}




export const config: WebSiteConfiguration = new WebSiteConfiguration('DB', 'مدیریت وب سایت ', ' ', [
  //new EntityConfiguration(VendeeComponent, 'داشبورد فروشنده', [], { icon: 'file-tree' }),
  new EntityConfiguration<Category>("Category", Category, CategoryComponent, 'دسته بندی', FullStatuses, [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ParentCategoryId, 'شناسه والد', { value: null, Type: 'number', Validators: [] }),
    new PropertyConfiguration(c => c.EnTitle, 'نام انگلیسی', { value: '', Type: 'number', Validators: [] }),
    new PropertyConfiguration(c => c.Icon, 'آیکون', { value: '', Type: 'number', Validators: [] }),
    new PropertyConfiguration(c => c.Summary, 'توضیحات خلاصه', { value: null, Type: 'string', Validators: [] }),
    new PropertyConfiguration(c => c.Description, 'توضیحات', { value: '', Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration(c => c.Priority, 'اولویت', { value: 0, Type: 'number', Validators: [] }),
    new PropertyConfiguration(c => c.Color, 'رنگ', { value: '', Type: 'color', Validators: [] }),
    new PropertyConfiguration(c => c.Images, 'تصاویر', { value: [], Type: 'list', Validators: [] }),
  ], { componentType: ComponentTypes.tree, treeParentKey: getNameOf<Category>(c => c.ParentCategoryId), icon: 'file-tree' }),

  new EntityConfiguration<Vendor>("Vendor", Vendor, VendorComponent, 'فروشگاه', FullStatuses, [
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


  new EntityConfiguration<VendorDetail>("VendorSell", VendorDetail, VendorDetailComponent, 'اطلاعات فروش فروشگاه', FullStatuses, [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Successed, 'فاکتور موفق', {}),
    new PropertyConfiguration(c => c.Confirmed, 'فاکتور قطعی شده', {}),
    new PropertyConfiguration(c => c.Created, 'فاکتور صادر شده', {}),
    new PropertyConfiguration(c => c.WaitingForPayment, 'فاکتور در انتظار پرداخت', {}),
    new PropertyConfiguration(c => c.Canceled, 'فاکتور باطل شده', {}),
  ], { icon: 'storefront', canAdd: false, canDelete: false, getTitle: (item: FormGroup) => { return "getTitle" }, neededData: [], componentType: ComponentTypes.lazytable }),
  new EntityConfiguration<VendorBalance>("VendorBalance", VendorBalance, VendorBalanceComponent, 'موجودی حساب فروشگاه', FullStatuses, [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Free, 'آزاد', {}),
    new PropertyConfiguration(c => c.Paid, 'پرداخت شده', {}),
    new PropertyConfiguration(c => c.Block, 'بلاک شده', {}),
  ], { icon: 'bank', canAdd: false, canDelete: false, getTitle: (item: FormGroup) => { return item.controls['Title']?.value ?? "جدید"; } }),
  new EntityConfiguration<VendorBankAccount>("VendorBankAccount", VendorBankAccount, VendorBankAccountComponent, 'حساب بانکی فروشگاه', FullStatuses, [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.BankId, 'بانک', { Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Sheba, 'شماره شبا', { InTable: false }),
    new PropertyConfiguration(c => c.Priority, 'اولویت', {}),
  ], { icon: 'bank', getTitle: (item: FormGroup) => { return item.controls['Title']?.value ?? "جدید"; }, neededData: [Bank] }),
  new EntityConfiguration<VendorWithdraw>("VendorWithdraw", VendorWithdraw, VendorWithdrawComponent, 'درخواست وجه فروشگاه', FullStatuses, [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendorBankAccountId, 'حساب', {}),
    new PropertyConfiguration(c => c.Value, 'مبلغ', {}),
    new PropertyConfiguration(c => c.Number, 'شماره پیگیری', {}),
    new PropertyConfiguration(c => c.Type, 'نوع انتقال', {}),
    new PropertyConfiguration(c => c.DateTime, 'زمان اتقال', {}),
  ], { neededData: [Bank], canAdd: false, canDelete: false, getTitle: (item: FormGroup) => { return item.controls['Title']?.value ?? "جدید"; } }),






  new EntityConfiguration<Vendee>("Vendee", Vendee, VendeeComponent, 'خریدار', FullStatuses, [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.FirstName, 'نام', { InPicker: true }),
    new PropertyConfiguration(c => c.LastName, 'نام خانوادگی', { InPicker: true }),
    new PropertyConfiguration(c => c.CellPhone, 'شماره تماس', { InPicker: true }),
    new PropertyConfiguration(c => c.CellPhoneConfirm, 'تایید شماره تماس', {}),
    new PropertyConfiguration(c => c.MelliCode, 'کد ملی', { Validators: [Validators.required, Validators.maxLength(10), Validators.minLength(10)] }),
    new PropertyConfiguration(c => c.Password, 'پسورد', {}),
    new PropertyConfiguration(c => c.Addresses, 'آدرس', { InTable: false, InSearch: false }),
  ], { icon: 'cart-outline', getTitle: (item: FormGroup) => { return (item.controls['FirstName']?.value ?? "جدید") + " " + (item.controls['LastName']?.value ?? "جدید"); } }),





  new EntityConfiguration<Province>("Province", Province, ProvinceComponent, 'استان', FullStatuses, [
    ...defaultPropertyWithTitleConfiguration,
  ], { componentType: ComponentTypes.table }),

  new EntityConfiguration<City>("City", City, CityComponent, 'شهرستان', FullStatuses, [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ProvinceId, 'استان', {}),
  ], { neededData: [Province], componentType: ComponentTypes.table }),

  new EntityConfiguration<Bank>("Bank", Bank, BankComponent, 'بانک', FullStatuses, [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration(c => c.ShebaValidator, 'اعتبار سنج شماره شبا', {}),
    new PropertyConfiguration(c => c.CardValidator, 'اعتبار سنج شماره کارت', {}),
    new PropertyConfiguration(c => c.AccountNumberValidator, 'اعتبار سنج شماره حساب', {}),
  ], { icon: 'cash-multiple', componentType: ComponentTypes.table }),
  //new EntityConfiguration(ProductComponent, 'محصول', [], {}),
  //new EntityConfiguration(VendorComponent, '', [], {}),
  new EntityConfiguration<Invoice>("Invoice", Invoice, InvoiceComponent, 'فاکتور ها', [ActiveStatus, ...InvoiceStatus, DeletedStatus], [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration(c => c.VendeeId, 'خریدار', { canEdit: false, Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.VendorId, 'فروشگاه', { canEdit: false, Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.Discount, 'تخففیف روی کل فاکتور', { InTable: false, Validators: [Validators.required] }),
    new PropertyConfiguration(c => c.InvoiceDetails, 'جزییات فاکتور', { InTable: false }),
    new PropertyConfiguration(c => c.PaymentType, 'نحوه پرداخت', { InTable: false }),
    new PropertyConfiguration(c => c.Description, 'توضیحات', { InTable: false }),
    new PropertyConfiguration(c => c.PostCost, 'هزینه ارسال', { InTable: false }),
    new PropertyConfiguration(c => c.PostType, 'نحوه ارسال', { InTable: false }),
    //new PropertyConfiguration(c => c.Options, ' سایر تنظیمات', { InTable: false }),
  ], { getTitle: (item: FormGroup) => { return (item.controls[getNameOf<Invoice>(c => c.VendeeId)]?.value?.toString() ?? "جدید"); } }),
  new EntityConfiguration<Ticket>("Ticket", Ticket, TicketComponent, 'تیکت ها', FullStatuses, [
    ...defaultPropertyWithTitleConfiguration,
  ], {}),
  new EntityConfiguration<Transaction>("Transaction", Transaction, TransactionComponent, 'تراکنش', FullStatuses, [
  ], { icon: 'transfer' }),

], {});

@NgModule({
  declarations: [
    CategoryComponent,
    VendorComponent,
    VendorDetailComponent,
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



