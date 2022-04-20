import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendeeAddressesComponent, VendeeCardsComponent, VendeeInvoicesComponent, VendeeLayoutComponent, VendeeProfileComponent, VendeeTicketComponent, VendeeTransactionsComponent } from './vendee-layout.component';

import { RouterModule, Routes, Route } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { VendeeAuthService } from './vendee-auth';

const routes: Route[] = [
  {
    path: '', component: VendeeLayoutComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: VendeeProfileComponent },
      { path: 'transactions', component: VendeeTransactionsComponent },
      { path: 'invoices', component: VendeeInvoicesComponent },
      { path: 'addresses', component: VendeeAddressesComponent },
      { path: 'cards', component: VendeeCardsComponent },
      { path: 'tickets', component: VendeeTicketComponent }
    ]
  }
  //  { path: 'invoice/:id', component: InvoiceComponent },
];

@NgModule({
  declarations: [
    VendeeLayoutComponent,
    VendeeInvoicesComponent,
    VendeeProfileComponent,
    VendeeAddressesComponent,
    VendeeTransactionsComponent,
    VendeeTicketComponent,
    VendeeCardsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule.forChild(),
  ],
  providers: []
})
export class VendeeModule { }
