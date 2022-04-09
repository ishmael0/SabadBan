import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment/payment.component';
import { RouterModule, Route } from '@angular/router';

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
    RouterModule.forChild(routes)
  ]
})
export class PayModule { }
