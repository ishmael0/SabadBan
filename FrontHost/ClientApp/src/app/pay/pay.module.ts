import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { RouterModule, Route } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';

const routes: Route[] = [
  { path: ':guid', component: PaymentComponent },
  //{ path: 'invoices/:guid', component: PaymentComponent },
]

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    NzGridModule,
    RouterModule.forChild(routes)
  ]
})
export class PayModule { }
