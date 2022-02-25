import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LayOutComponent } from './lay-out/lay-out.component';

const routes: Route[] = [
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: LayOutComponent, children: [
      { path: '', component: IndexComponent }
    ]
  }

];

@NgModule({
  declarations: [
    IndexComponent,
    LayOutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class FrontModule {


}
