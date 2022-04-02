import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import fa from '@angular/common/locales/fa';
import { NZ_I18N, fa_IR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
registerLocaleData(fa);


const routes: Routes = [
  { path: '', redirectTo: 'management', pathMatch: 'full' },
  //{ path: 'home', loadChildren: () => import('./front/front.module').then(m => m.FrontModule) },
  { path: 'management', loadChildren: () => import('./back/back-wrapper-module').then(m => m.BackWrapperModule) },

];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [{ provide: NZ_I18N, useValue: fa_IR }],
  bootstrap: [AppComponent]
})
export class AppModule {

}
