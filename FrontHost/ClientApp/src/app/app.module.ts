import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntDesignSharedModulesModule } from '../../../../../Santel/ClientApp/src/app/ant-design-shared-modules/ant-design-shared-modules.module';
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
const routes: Route[] = [
  {
    path: '', component: LayoutComponent, children: [
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
          { path: '', component: VendeeProfileComponent },
          { path: '', component: VendeeInvoicesComponent },
          { path: '', component: VendeeAddressesComponent },
        ]
      },
    ]
  },
  { path: 'invoice/:guid', component: InvoiceComponent, canActivate: [AuthService] },

];

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
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CommonModule,
    AntDesignSharedModulesModule,
    NzCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [HttpRequestService]
})
export class AppModule {
}

