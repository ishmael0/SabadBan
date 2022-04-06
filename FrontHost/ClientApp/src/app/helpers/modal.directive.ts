import { TemplateRef, Directive, ElementRef, AfterViewInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Directive({
  selector: '[modal]'
})
export class ModalDirective implements AfterViewInit, OnChanges {
  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.divElement) {
      if (this.display)
        this.renderer.setStyle(this.divElement, 'display', "block");
      else
        this.renderer.setStyle(this.divElement, 'display', "none");
    }
  }
  @Input() display = false;
  @Output() displayChange = new EventEmitter<boolean>();

  divElement: any;
  ngAfterViewInit() {
    this.divElement = this.renderer.createElement("div");
    this.renderer.addClass(this.divElement, "modal");
    this.renderer.appendChild(this.divElement, this.el.nativeElement);
    this.renderer.appendChild(document.body, this.divElement);
    this.renderer.setStyle(this.el.nativeElement, 'height', '90%');

    this.renderer.setStyle(this.el.nativeElement.children[0],'height' ,'80%');

    if (this.divElement.getElementsByClassName('close').length > 0) {
      var close = this.divElement.getElementsByClassName('close')[0];
      this.renderer.listen(close, 'click', (evt) => {
        this.display = false;
        this.displayChange.emit(this.display);
      });
    }

  }

  //ngAfterViewInit() {
  //  console.log(this.el.nativeElement)
  //  var parent = this.el.nativeElement.parentNode;
  //  this.divElement = this.renderer.createElement("div");
  //  var bodyElement = this.renderer.createElement("div");
  //  var headerElement = this.renderer.createElement("div");
  //  var closeSpanElement = this.renderer.createElement("span");
  //  var titleElement = this.renderer.createElement("div");
  //  closeSpanElement.innerHTML = "&times;"
  //  this.renderer.listen(closeSpanElement, 'click', (evt) => {
  //    this.display = false;
  //    this.displayChange.emit(this.display);
  //  });
  //  this.renderer.appendChild(headerElement, titleElement);
  //  this.renderer.appendChild(headerElement, closeSpanElement);

  //  this.renderer.addClass(closeSpanElement, "close");
  //  this.renderer.addClass(headerElement, "header");
  //  //this.renderer.setStyle(closeElement, 'text-align', "end");
  //  this.renderer.addClass(bodyElement, "body");
  //  this.renderer.addClass(bodyElement, "glass");
  //  this.renderer.addClass(this.divElement, "modal");
  //  //this.renderer.appendChild(bodyElement, headerElement);
  //  this.renderer.appendChild(this.divElement, bodyElement);
  //  this.renderer.appendChild(bodyElement, this.el.nativeElement);
  //  this.renderer.appendChild(document.body, this.divElement);


  //  this.renderer.removeAttribute(this.el.nativeElement, 'modal');
  //  this.renderer.addClass(this.el.nativeElement, 'body-content');
  //}

}


