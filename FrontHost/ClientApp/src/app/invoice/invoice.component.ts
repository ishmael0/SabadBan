import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FrontBaseComponent } from '../layout/layout.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvoiceComponent extends FrontBaseComponent{
  @Input() invoice!:any;

}
