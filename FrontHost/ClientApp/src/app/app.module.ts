import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';

import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RulesComponent } from './rules/rules.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
//import { AboutComponent } from './about/about.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { VendeeLayoutComponent } from './vendee-layout/vendee-layout.component';
import { AuthService } from './auth';
import { VendeeInvoicesComponent } from './vendee-invoices/vendee-invoices.component';
import { VendeeProfileComponent } from './vendee-profile/vendee-profile.component';
import { VendeeAddressesComponent } from './vendee-addresses/vendee-addresses.component';
import { AppComponent } from './app.component';
import { HttpRequestService } from './http-request';
import { DesignSystemComponent } from './design-system/design-system.component';
import { VendeeTransactionsComponent } from './vendee-transactions/vendee-transactions.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorComponent } from './vendor/vendor.component';
import { enableProdMode, APP_INITIALIZER } from '@angular/core';
import { HTTPTypes, RequestPlus } from '../../../../../Santel/ClientApp/src/app/services/utils';
import { DataService } from './data.service';

export const environment = {
  production: false
};
 if (environment.production) {
  enableProdMode();
}
import { registerLocaleData } from '@angular/common';
import fa from '@angular/common/locales/fa';
import { NZ_I18N, fa_IR } from 'ng-zorro-antd/i18n';
registerLocaleData(fa);

const routes: Route[] = [
  {
    path: '', component: LayoutComponent, children: [
      ...(environment.production ? [] : [{ path: 'designsystem', component: DesignSystemComponent}]),
      { path: '', component: IndexComponent },
      { path: 'login', component: LoginComponent },
      { path: 'login/:redirectlink', component: LoginComponent },
      { path: 'rules', component: RulesComponent },
      { path: 'news', component: NewsComponent },
      { path: 'article', component: ArticleComponent },
      { path: 'vendors', component: VendorsComponent },
      { path: 'vendors/:id', component: VendorComponent },

      {
        path: 'vendee', component: VendeeLayoutComponent, canActivate: [AuthService], children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: VendeeProfileComponent },
          { path: 'transactions', component: VendeeTransactionsComponent },
          { path: 'invoices', component: VendeeInvoicesComponent },
          { path: 'addresses', component: VendeeAddressesComponent },
        ]
      },
    ]
  },
  { path: 'invoice/:guid', component: InvoiceComponent, canActivate: [AuthService] },

];

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

 
export function AppInitializerProvider() {
  let x = {
    provide: APP_INITIALIZER,
    useFactory: (http: HttpRequestService, ds: DataService) => async() => {
      await http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'init', {
        tokenNeeded:false,
        action: 'InitData',
        onSuccess: (m, d) => { ds.init(d); console.log(d) },
        onError: (m, d) => { console.log(0) },
      }))
    },
    deps: [HttpRequestService, DataService],
    multi: true,
  }
  return x;
};

@NgModule({
  declarations: [
    IndexComponent,
    LayoutComponent,
    LoginComponent,
    RulesComponent,
    NewsComponent,
    ArticleComponent,
    InvoiceComponent,
    VendeeLayoutComponent,
    VendeeInvoicesComponent,
    VendeeProfileComponent,
    VendeeAddressesComponent,
    AppComponent,
    DesignSystemComponent,
    VendeeTransactionsComponent,
    VendorsComponent,
    VendorComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CommonModule,
    NzCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    NzTreeModule,
    NzTableModule,
    NzSpinModule,
    NzNotificationModule,
    NzGridModule,
    NzDropDownModule
  ],
  bootstrap: [AppComponent],
  providers: [NzNotificationService, HttpRequestService, { provide: NZ_I18N, useValue: fa_IR }, AppInitializerProvider()]
})
export class AppModule {
}

