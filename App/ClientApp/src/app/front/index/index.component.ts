import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  Features = [
    { Title: 'حفظ محرمانگی اطلاعات کاربر', UpperText: 'UpperText', LowerText: 'LowerText', UpperIcon: '', LowerIcon: '' },
    { Title: 'احراز هویت فروشندگان', UpperText: 'UpperText', LowerText: 'LowerText', UpperIcon: '', LowerIcon: '' },
    { Title: 'زتبه بندی فروشندگان', UpperText: 'UpperText', LowerText: 'LowerText', UpperIcon: '', LowerIcon: '' },

    { Title: 'ضمانت بازگشت وجه', UpperText: 'UpperText', LowerText: 'LowerText', UpperIcon: '', LowerIcon: ''},
    { Title: 'ضمانت دریافت کالا', UpperText: 'UpperText', LowerText: 'LowerText', UpperIcon: '', LowerIcon: ''},
    { Title: 'پشتیبانی 24 ساعته', UpperText: 'UpperText', LowerText: 'LowerText', UpperIcon: '', LowerIcon: '' },

    { Title: 'سفارش امن', UpperText: 'UpperText', LowerText: 'LowerText', UpperIcon: '', LowerIcon: ''},
    { Title: 'سفارش امن', UpperText: 'UpperText', LowerText: 'LowerText', UpperIcon: '', LowerIcon: ''},
  ]
}
