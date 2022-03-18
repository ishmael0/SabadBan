import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-vendee-invoices',
  templateUrl: './vendee-invoices.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeInvoicesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
