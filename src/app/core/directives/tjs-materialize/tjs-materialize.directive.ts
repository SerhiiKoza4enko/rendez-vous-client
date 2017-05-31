import { Directive } from '@angular/core';
import * as jQuery from 'jquery';

@Directive({
  selector: '[tjsMaterialize]'
})

export class TjsMaterializeDirective {
  constructor() {
    jQuery(document).ready(() => {
      setTimeout(() => {
        // (<any>jQuery)('body').bootstrapMaterialDesign({ text: { selector: [] } });
        const jQueryMaterial = (<any> jQuery);
        jQueryMaterial.material.options.withRipples += ',.waves-effect,.btn';
        jQueryMaterial.material.options.inputElements += '';
        jQueryMaterial.material.init();
      }, 300);
    });
  }
}
