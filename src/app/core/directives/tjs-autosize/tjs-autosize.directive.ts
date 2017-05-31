import { Directive, ElementRef } from '@angular/core';
// import * as jQuery from 'jquery';
import * as autosize from 'autosize';

@Directive({
  selector: '[tjsAutosize]'
})

export class TjsAutosizeDirective {
  constructor(element: ElementRef) {
    setTimeout(() => autosize(element.nativeElement), 300);
  }
}
