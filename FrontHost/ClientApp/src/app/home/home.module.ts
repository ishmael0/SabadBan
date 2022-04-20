import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';




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
import { environment } from '../app.module';

import { APP_INITIALIZER } from '@angular/core';
import { NewssComponent } from './newss/newss.component';
import { RegisterComponent } from './register/register.component';
import { ArticlesComponent } from './articles/articles.component';
import { SharedModule } from '../shared/shared.module';
import { HttpRequestService } from '../http-request';
import { VendeeAuthService } from '../vendee/vendee-auth';

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
      { path: 'vendee', loadChildren: () => import('../vendee/vendee.module').then(m => m.VendeeModule) },
    ]
  },
  //{ path: 'invoice/:guid', component: InvoiceComponent},
  //{ path: 'invoice/:guid', component: InvoiceComponent },

];
//export function AppInitializerProvider() {
//  let x = {
//    provide: APP_INITIALIZER,
//    useFactory: (http: HttpRequestService, ds: DataService) => async () => {
//      await http.AddAndTry(new RequestPlus(HTTPTypes.GET, 'Data', {
//        tokenNeeded: false,
//        action: 'Init',
//        onSuccess: (m, d) => { ds.init(d);console.log(d) },
//        onError: (m, d) => { },
//      }))
//    },
//    deps: [HttpRequestService, DataService],
//    multi: true,
//  }
//  return x;
//};

@NgModule({
  declarations: [
    IndexComponent,
    LayoutComponent,
    LoginComponent,
    RulesComponent,
    NewsComponent,
    ArticleComponent,
    InvoiceComponent,

    DesignSystemComponent,
    VendorsComponent,
    VendorComponent,

    NewssComponent,
    RegisterComponent,

    ArticlesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule.forChild()
  ],
  //providers: []
  providers: [
    { provide: 'wsAuthKey', useValue: 'abc' },
     //, AppInitializerProvider()
  ]

})
export class HomeModule { }
