import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTPTypes, RequestPlus } from '../../../../../../Santel/ClientApp/src/app/services/utils';
import { DataService } from './../data.service';
import { RouterModule, Routes, Route } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { DecimalPipe } from '@angular/common';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ModalDirective } from './helpers/modal.directive';
import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RulesComponent } from './rules/rules.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
import { DesignSystemComponent } from './design-system/design-system.component';
import { VendorsComponent } from './vendors/vendors.component';
import { VendorComponent } from './vendor/vendor.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { VendeeAddressesComponent, VendeeTicketComponent, VendeeCardsComponent, VendeeInvoicesComponent, VendeeLayoutComponent, VendeeProfileComponent, VendeeTransactionsComponent } from './vendee-layout/vendee-layout.component';
import { AuthService } from '../auth';
import { environment } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { APP_INITIALIZER } from '@angular/core';
import { HttpRequestService } from './../http-request';
import { CounterDirective } from './helpers/counter.directive';
import { NewssComponent } from './newss/newss.component';
import { RegisterComponent } from './register/register.component';
import { ArticlesComponent } from './articles/articles.component';

const routes: Route[] = [
  {
    path: '', component: LayoutComponent, children: [
      ...(environment.production ? [] : [{ path: 'designsystem', component: DesignSystemComponent }]),
      { path: '', component: IndexComponent },
      { path: 'login', component: LoginComponent },
      { path: 'login/:redirectlink', component: LoginComponent },
      { path: 'rules', component: RulesComponent },
      { path: 'news', component: NewssComponent },
      { path: 'news/:id', component: NewsComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: 'article/:id', component: ArticleComponent },
      { path: 'vendors', component: VendorsComponent },
      { path: 'vendor/:id', component: VendorComponent },
      { path: 'register', component: RegisterComponent },
      {
        path: 'vendee', component: VendeeLayoutComponent, canActivate: [AuthService], children: [
          { path: '', redirectTo: 'profile', pathMatch: 'full' },
          { path: 'profile', component: VendeeProfileComponent },
          { path: 'transactions', component: VendeeTransactionsComponent },
          { path: 'invoices', component: VendeeInvoicesComponent },
          { path: 'addresses', component: VendeeAddressesComponent },
          { path: 'cards', component: VendeeCardsComponent },
          { path: 'tickets', component: VendeeTicketComponent },
          //  { path: 'invoice/:id', component: InvoiceComponent },
        ]
      },
    ]
  },
  //{ path: 'invoice/:guid', component: InvoiceComponent},
  //{ path: 'invoice/:guid', component: InvoiceComponent },

];
export function AppInitializerProvider() {
  let x = {
    provide: APP_INITIALIZER,
    useFactory: (http: HttpRequestService, ds: DataService) => async () => {
      await http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'Data', {
        tokenNeeded: false,
        action: 'Init',
        onSuccess: (m, d) => { ds.init(d);console.log(d) },
        onError: (m, d) => { },
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
    DesignSystemComponent,
    VendeeTransactionsComponent,
    VendorsComponent,
    VendorComponent,
    ModalDirective,
    CounterDirective,
    NewssComponent,
    RegisterComponent,
    VendeeTicketComponent,
    VendeeCardsComponent,
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),


    NzCarouselModule,
    FormsModule,
    ReactiveFormsModule,
    NzTreeModule,
    NzTableModule,
    NzSpinModule,
    NzNotificationModule,
    NzGridModule,
    NzDropDownModule

  ],
  //providers: []
  providers: [HttpRequestService, AuthService, NzNotificationService, DecimalPipe
    //, AppInitializerProvider()
  ]

})
export class HomeModule { }
