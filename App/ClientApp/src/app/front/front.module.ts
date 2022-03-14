import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LayOutComponent } from './lay-out/lay-out.component';
import { AntDesignSharedModulesModule } from '../../../../../../Santel/ClientApp/src/app/ant-design-shared-modules/ant-design-shared-modules.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ThemeService } from '../../../../../../Santel/ClientApp/src/app/services/theme.service';
import { LoginComponent } from './login/login.component';

const routes: Route[] = [
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: LayOutComponent, children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: LoginComponent },
    ]
  }

];

@NgModule({
  declarations: [
    IndexComponent,
    LayOutComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AntDesignSharedModulesModule,
    NzCarouselModule,
    RouterModule.forChild(routes)
  ]
})
export class FrontModule {
  constructor(themeService: ThemeService) {
    themeService.loadTheme();

  }

}
