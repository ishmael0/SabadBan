import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-vendee-transactions',
  templateUrl: './vendee-transactions.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendeeTransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
