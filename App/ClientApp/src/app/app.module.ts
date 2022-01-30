import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { WebSelectorComponent } from '../../../../../Santel/ClientApp/src/app/shared/components/web-selector/web-selector.component';
import { LoginComponent } from '../../../../../Santel/ClientApp/src/app/shared/components/login/login.component';
import { SharedModule } from '../../../../../Santel/ClientApp/src/app/shared/shared.module';
import { WebSiteService } from '../../../../../Santel/ClientApp/src/app/services/website.service';



const routes: Routes = [
  {
    path: '', redirectTo: 'webselector', pathMatch:'full'
  },
  {
    path: 'Home', loadChildren: () => import('./front/front.module').then(m => m.FrontModule),
  },
  //{ path: '', redirectTo: 'shopify', pathMatch: 'full' },
  {
    path: 'AccDB'.toLowerCase(), loadChildren: () => import('../../../../../Santel/ClientApp/src/app/account-manager/account-manager.module').then(m => m.AccountManagerModule),
    data: {
      key: 'AccDB'.toLowerCase(), label: 'مدیریت کاربران', isAcc: true
    }
  },
  {
    path: 'management'.toLowerCase(), loadChildren: () => import('./back/back.module').then(m => m.BackModule),
    data: { key: 'DB'.toLowerCase(), label: ' مدیریت وب سایت' }
  },

  { path: 'webselector', component: WebSelectorComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    SharedModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(wss: WebSiteService) {
    wss.appConfig = {
      description: '',
      fullName: '',
      logInDesc: 'ماهر پی  '
    }
  }
}