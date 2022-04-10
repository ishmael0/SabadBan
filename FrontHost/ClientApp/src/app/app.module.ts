import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';


export const environment = {
  production: false
};
 if (environment.production) {
  enableProdMode();
}
import { registerLocaleData } from '@angular/common';
import fa from '@angular/common/locales/fa';
import { NZ_I18N, fa_IR } from 'ng-zorro-antd/i18n';
import { HttpRequestService } from './http-request';
import { AuthService } from './auth';
registerLocaleData(fa);


const routes: Route[] = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'invoice', loadChildren: () => import('./pay/pay.module').then(m => m.PayModule) },
]

 

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,


  ],
  bootstrap: [AppComponent],
  providers: [HttpRequestService, AuthService, NzNotificationService, { provide: NZ_I18N, useValue: fa_IR }]
})
export class AppModule {
}

