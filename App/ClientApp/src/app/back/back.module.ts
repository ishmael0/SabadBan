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
import { CategoryComponent, VendorComponent, BankComponent, CityComponent, ProvinceComponent, TicketComponent, TransactionComponent, VendeeComponent, VendorBankAccountBalanceComponent, VendorBankAccountComponent, VendorSellComponent } from './components';




export const config: WebSiteConfiguration = new WebSiteConfiguration('DB', 'مدیریت وب سایت ', ' ', [
  //new EntityConfiguration(VendeeComponent, 'داشبورد فروشنده', [], { icon: 'file-tree' }),
  new EntityConfiguration(CategoryComponent, 'دسته بندی', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration('ParentCategoryId', 'شناسه والد', { value: null, Type: 'number', Validators: [] }),
    new PropertyConfiguration('EnTitle', 'نام انگلیسی', { value: '', Type: 'number', Validators: [] }),
    new PropertyConfiguration('Icon', 'آیکون', { value: '', Type: 'number', Validators: [] }),
    new PropertyConfiguration('Summary', 'توضیحات خلاصه', { value: null, Type: 'string', Validators: [] }),
    new PropertyConfiguration('Description', 'توضیحات', { value: '', Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration('Priority', 'اولویت', { value: 0, Type: 'number', Validators: [] }),
    new PropertyConfiguration('Color', 'رنگ', { value: '', Type: 'color', Validators: [] }),
    new PropertyConfiguration('Images', 'تصاویر', { value: [], Type: 'list', Validators: [] }),
  ], { componentType: ComponentTypes.tree, icon: 'file-tree' }),

  new EntityConfiguration(VendorComponent, 'اطلاعات فروشنده', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration('TitleEn', 'نام لاتین', { Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    //new PropertyConfiguration('IsConfirmed', 'تایید شده', { Type:'bool' }),
    //new PropertyConfiguration('Categories', 'دسته بندی ها', { Type: 'string', value:[] }),
    new PropertyConfiguration('Province', 'استان', {}),
    new PropertyConfiguration('City', 'شهرستان', {}),
    new PropertyConfiguration('Address', 'آدرس', {}),
    new PropertyConfiguration('Description', 'توضیحات', { value: '', Type: 'string', Validators: [Validators.required, Validators.minLength(3)] }),
    new PropertyConfiguration('longitude', 'طول جغرافیایی', {}),
    new PropertyConfiguration('latitude', 'عرض جغرافیایی', {}),
  ], { icon: 'storefront', getTitle: (item: FormGroup) => { return "getTitle" }, neededData: [] }),
  //CreatedReadyToConfirm
  //ConfirmedReadyToSetStatus 
  //ReadyToSend
  //SendingWithPostOffice
  //SendingWithDirectMethod
  //PaidBeforePost
  //Done


  new EntityConfiguration(VendorSellComponent, 'اطلاعات فروش', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration('Successed', 'تعداد فاکتور موفق', {}),
    new PropertyConfiguration('Confirmed', 'تعداد فاکتور قطعی شده', {}),
    new PropertyConfiguration('Created', 'تعداد فاکتور صادر شده', {}),
    new PropertyConfiguration('WaitingForPayment', 'تعداد فاکتور در انتظار پرداخت', {}),
    new PropertyConfiguration('Canceled', 'تعداد فاکتور باطل شده', {}),
    new PropertyConfiguration('', '', {}),
  ], { icon: 'storefront', getTitle: (item: FormGroup) => { return "getTitle" }, neededData: [] }),
  new EntityConfiguration(VendorBankAccountComponent, 'اطلاعات حساب', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration('', 'نام بانک', {}),
    new PropertyConfiguration('', 'شماره حساب', {}),
    new PropertyConfiguration('', 'شماره شبا', {}),
    new PropertyConfiguration('', 'شماره کارت', {}),
    new PropertyConfiguration('', 'حساب اصلی', {}),
  ], {}),
  new EntityConfiguration(VendorBankAccountBalanceComponent, 'موجودی', [
    ...defaultPropertyConfiguration,
    new PropertyConfiguration('Free', 'آزاد', {}),
    new PropertyConfiguration('Paid', 'پرداخت شده', {}),
    new PropertyConfiguration('Block', 'بلاک شده', {}),
  ], {}),




  new EntityConfiguration(ProvinceComponent, 'استان', [
    ...defaultPropertyWithTitleConfiguration,
  ], {}),

  new EntityConfiguration(CityComponent, 'شهرستان', [
    ...defaultPropertyWithTitleConfiguration,
    new PropertyConfiguration('ProvinceId', 'استان', {}),
  ], { neededData: [ProvinceComponent] }),

  new EntityConfiguration(TransactionComponent, 'تراکنش', [

  ], { icon: 'transfer' }),
  new EntityConfiguration(BankComponent, 'بانک', [], { componentType: ComponentTypes.lazytable }),
  //new EntityConfiguration(ProductComponent, 'محصول', [], {}),
  new EntityConfiguration(VendeeComponent, 'خریدار', [...defaultPropertyWithTitleConfiguration], { icon: 'cart-outline' }),
  //new EntityConfiguration(VendorComponent, '', [], {}),
  new EntityConfiguration(TicketComponent, 'تیکت ها', [
    ...defaultPropertyWithTitleConfiguration,
  ], {}),
]);

@NgModule({
  declarations: [
    CategoryComponent,
    VendorComponent,
    VendorSellComponent,
    VendorBankAccountComponent,
    VendorBankAccountBalanceComponent,
    ProvinceComponent,
    CityComponent,
    BankComponent,
    TransactionComponent,
    VendeeComponent,
    TicketComponent
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
