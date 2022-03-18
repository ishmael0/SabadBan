import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './layout/layout.component';
import { AntDesignSharedModulesModule } from '../../../../../Santel/ClientApp/src/app/ant-design-shared-modules/ant-design-shared-modules.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { LoginComponent } from './login/login.component';
import { RulesComponent } from './rules/rules.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VendeeLayoutComponent } from './vendee-layout/vendee-layout.component';
import { AuthService } from './Auth';
import { VendeeInvoicesComponent } from './vendee-invoices/vendee-invoices.component';
import { VendeeProfileComponent } from './vendee-profile/vendee-profile.component';
import { VendeeAddressesComponent } from './vendee-addresses/vendee-addresses.component';
import { HttpRequestService } from '../../../../../Santel/ClientApp/src/app/services/http-request.service';
import { AppComponent } from './app.component';
const routes: Route[] = [
  { path: 'invoice/:guid', component: InvoiceComponent, canActivate: [AuthService] },
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
  }
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
  ],
  imports: [
    CommonModule,
    AntDesignSharedModulesModule,
    NzCarouselModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  providers: [HttpRequestService]
})
export class AppModule {
}
