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
import { AboutComponent } from './about/about.component';
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

export const environment = {
  production: false
};
import { enableProdMode } from '@angular/core';
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
      { path: 'about', component: AboutComponent },

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

@NgModule({
  declarations: [
    IndexComponent,
    LayoutComponent,
    LoginComponent,
    RulesComponent,
    NewsComponent,
    ArticleComponent,
    AboutComponent,
    InvoiceComponent,
    VendeeLayoutComponent,
    VendeeInvoicesComponent,
    VendeeProfileComponent,
    VendeeAddressesComponent,
    AppComponent,
    DesignSystemComponent,
    VendeeTransactionsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CommonModule,
    NzCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    NzTableModule,
    NzSpinModule,
    NzNotificationModule,
    NzGridModule
  ],
  bootstrap: [AppComponent],
  providers: [NzNotificationService, HttpRequestService, { provide: NZ_I18N, useValue: fa_IR }]
})
export class AppModule {
}

