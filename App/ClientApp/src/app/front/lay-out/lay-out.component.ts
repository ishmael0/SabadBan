import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-lay-out',
  templateUrl: './lay-out.component.html',
  styles: [
    `
     [nz-carousel-content] {
        text-align: center;
        width: 100%;
        line-height: 160px;
        background: #364d79;
        color: #fff;
        overflow: hidden
      }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayOutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
