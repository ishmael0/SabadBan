import { TemplateRef, Directive, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[appCounter]'
})
export class CounterDirective implements AfterViewInit {

  constructor(public el: ElementRef, private _decimalPipe: DecimalPipe) {
  }
  ngAfterViewInit(): void {
    var num = +this.el.nativeElement.innerText
    var inc = Math.round(num / 100);
    var t = print(num, inc);
    var x = setInterval(
       () => {
        var r = t.next();
        this.el.nativeElement.innerText =  this._decimalPipe.transform( +r.value);
        if (r.done) {
          this.el.nativeElement.innerText = this._decimalPipe.transform(num);
          clearInterval(x);
        }
      }, 100);
  }

}

function* print(num: number, inc:number) {
  for (var i = 0; i < num; i = i + inc) {
    yield i;
  }
}
function* print2(num: number) {
  var temp = num;
  var add = 0;
  var digits = temp.toString().length;
  while (temp>0) {
    var last = Math.floor(temp / Math.pow(10, digits));
    if (last == 0) {
      for (var i = 0; i < 9; i++) {
        yield add + i * Math.pow(10, digits);
      }
      yield add;
    }
    else {
      for (var i = 0; i < last; i++) {
        yield add + i * Math.pow(10, digits);
      }
    }
    add = add + last * Math.pow(10, digits);
    temp = Math.floor(temp % Math.pow(10, digits));
   
    if (temp == 0 && digits > 1) {
      for (var i = 0; i < Math.pow(10, digits); i++) {
        yield add + i ;
      }
    }
    else {
      digits = digits - 1;
    }
  }
}
