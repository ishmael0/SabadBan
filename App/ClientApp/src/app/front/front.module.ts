import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './layout/layout.component';
import { AntDesignSharedModulesModule } from '../../../../../../Santel/ClientApp/src/app/ant-design-shared-modules/ant-design-shared-modules.module';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { ThemeService } from '../../../../../../Santel/ClientApp/src/app/services/theme.service';
import { LoginComponent } from './login/login.component';
import { RulesComponent } from './rules/rules.component';
import { NewsComponent } from './news/news.component';
import { ArticleComponent } from './article/article.component';
import { AboutComponent } from './about/about.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoicesComponent } from './invoices/invoices.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Route[] = [
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: LayoutComponent, children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: LoginComponent },
      { path: 'rules', component: RulesComponent },
      { path: 'news', component: NewsComponent },
      { path: 'article', component: ArticleComponent },
      { path: 'about', component: AboutComponent },
      { path: 'invoice', component: InvoiceComponent },
      { path: 'invoices', component: InvoicesComponent },
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
    InvoicesComponent,
  ],
  imports: [
    CommonModule,
    AntDesignSharedModulesModule,
    NzCarouselModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FrontModule {
  constructor(themeService: ThemeService) {
    themeService.loadTheme();

  }

}
