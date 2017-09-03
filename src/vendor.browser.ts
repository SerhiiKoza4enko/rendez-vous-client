// For vendors for example jQuery, Lodash, angular2-jwt just import them here unless you plan on
// chunking vendors files for async loading. You would need to import the async loaded vendors
// at the entry point of the async loaded file. Also see custom-typings.d.ts as you also need to
// run `typings install x` where `x` is your module

// TODO(gdi2290): switch to DLLs

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// Other
import 'ng2-resource-rest';
import '@ng-bootstrap/ng-bootstrap';
import 'ng2-fullpage';
import 'ng2-slim-loading-bar';
import 'ng2-validation';
import 'ng2-webstorage';
import 'ng2-http-interceptor';
import 'ng2-rating';
import 'ag-grid/main';
import 'ag-grid-angular/main';
import 'angular2-tinymce';
import 'ng2-facebook-sdk';
import 'angular2-image-upload';
import 'popper.js';
import 'ngx-popper';
// import 'ng2-froala-editor/ng2-froala-editor';
// import 'angular2-color-picker';
// import 'ng2-highcharts';
// import 'angular2-moment';

// AngularClass
import '@angularclass/hmr';

// RxJS
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

// jQuery
import 'jquery';

// Owl Carousel 2
import 'owl.carousel';

// jQuery Color
// import 'jquery-color'; // unused

// Bootstrap
import 'bootstrap-loader';
import 'bootstrap';

// Bootstrap Material Design
import 'bootstrap-material-design';

// Fullpage
import 'fullpage.js';

// Autosize
import 'autosize';

// Sweet Alert 2
import 'sweetalert2';

// Froala WYSIWYG HTML Editor
// import 'froala-editor/js/froala_editor.pkgd.min';

// Highcharts
// import * as Highcharts from 'highcharts';
// (<any>window).Highcharts = Highcharts;
// // tslint:disable-next-line:no-var-requires
// require('highcharts/highcharts-more')(Highcharts);
// // tslint:disable-next-line:no-var-requires
// require('highcharts/modules/drilldown')(Highcharts);
// // tslint:disable-next-line:no-var-requires
// require('highcharts/modules/exporting')(Highcharts);
// // tslint:disable-next-line:no-var-requires
// require('highcharts/modules/funnel')(Highcharts);

// MomentJS
import 'moment';

if ('production' === ENV) {
  // Production
} else {
  // Development
}
