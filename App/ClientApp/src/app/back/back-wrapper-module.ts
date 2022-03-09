import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "../../../../../../Santel/ClientApp/src/app/shared/components/login/login.component";
import { WebSelectorComponent } from "../../../../../../Santel/ClientApp/src/app/shared/components/web-selector/web-selector.component";
//import { SharedModule } from "../../../../../../Santel/ClientApp/src/app/shared/shared.module";
import { DomSanitizer } from '@angular/platform-browser';
import { TemplateModule } from "../../../../../../Santel/ClientApp/src/app/template/template.module";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AntDesignSharedModulesModule } from "../../../../../../Santel/ClientApp/src/app/ant-design-shared-modules/ant-design-shared-modules.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService, SignalRService } from "../../../../../../Santel/ClientApp/src/app/services/auth.service";
import { CommonModule } from '@angular/common';
import { HttpRequestService } from "../../../../../../Santel/ClientApp/src/app/services/http-request.service";
import { WebSiteService } from "../../../../../../Santel/ClientApp/src/app/services/website.service";
import { ThemeService } from "../../../../../../Santel/ClientApp/src/app/services/theme.service";
import { AppInitializerProvider, AppInitializerProvider2 } from '../../../../../../Santel/ClientApp/src/app/services/app-initializer-provider';
import fa from '@angular/common/locales/fa';
import { NZ_I18N, fa_IR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
registerLocaleData(fa);
const routes: Routes = [
  { path: '', redirectTo: 'webselector', pathMatch: 'full' },
  {
    path: 'AccDB'.toLowerCase(), loadChildren: () => import('../../../../../../Santel/ClientApp/src/app/account-manager/account-manager.module').then(m => m.AccountManagerModule),
    data: {
      key: 'AccDB'.toLowerCase(), label: 'مدیریت کاربران', isAcc: true
    }
  },
  {
    path: 'admin'.toLowerCase(), loadChildren: () => import('./back.module').then(m => m.BackModule),
    data: { key: 'DB'.toLowerCase(), label: ' مدیریت وب سایت' }
  },
  { path: 'webselector', component: WebSelectorComponent },
  { path: 'login', component: LoginComponent }
];





@NgModule({
  declarations: [
    LoginComponent, WebSelectorComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AntDesignSharedModulesModule.forRoot(),
    RouterModule.forChild(routes),
  ], providers: [AuthService, NzNotificationService, SignalRService, HttpRequestService, WebSiteService,
    //AppInitializerProvider(),
    { provide: NZ_I18N, useValue: fa_IR }
  ]
})
export class BackWrapperModule {
  constructor(wss: WebSiteService, themeService: ThemeService, domSanitizer: DomSanitizer, auth: AuthService) {
    AppInitializerProvider2(themeService, domSanitizer, auth);
    wss.appConfig = {
      routes: routes,
      description: '',
      fullName: '',
      logInDesc: 'ماهر پی  ',
      urlPrefix: '/management/',
    }
  }
}
