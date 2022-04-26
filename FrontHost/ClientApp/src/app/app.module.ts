import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { enableProdMode } from '@angular/core';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { DecimalPipe } from '@angular/common';


export const environment = {
  production: false
};
 if (environment.production) {
  enableProdMode();
}
import { registerLocaleData } from '@angular/common';
import fa from '@angular/common/locales/fa';
import { NZ_I18N, fa_IR } from 'ng-zorro-antd/i18n';
import { DataService } from './data.service';
import { HttpRequestService } from './http-request';
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
    NzNotificationModule

  ],
  bootstrap: [AppComponent],
  providers: [NzNotificationService, DataService, HttpRequestService, NzNotificationService, DecimalPipe, { provide: NZ_I18N, useValue: fa_IR }]
})
export class AppModule {
}

