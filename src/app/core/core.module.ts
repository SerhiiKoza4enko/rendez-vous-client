import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule, ToastOptions } from 'ng2-toastr';
import { Ng2Webstorage } from 'ng2-webstorage';
import { HttpInterceptorModule, HTTP_INTERCEPTOR_PROVIDER } from 'ng2-http-interceptor';
import { CustomFormsModule } from 'ng2-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MnFullpageDirective, MnFullpageService } from 'ng2-fullpage';
import { RatingModule } from 'ng2-rating';
import {
  AgmCoreModule,
  SebmGoogleMap,
  SebmGoogleMapMarker,
  SebmGoogleMapInfoWindow
} from 'angular2-google-maps/core';
import { OwlModule } from 'ng2-owl-carousel';
import { AgGridModule, AgGridNg2 } from 'ag-grid-angular/main';
import { TinymceModule } from 'angular2-tinymce';
import { TextMaskModule, MaskedInputDirective } from 'angular2-text-mask';
import { FacebookModule } from 'ng2-facebook-sdk';
import { ImageUploadModule } from 'angular2-image-upload';

import { TjsAutosizeDirective } from './directives/tjs-autosize';
import { TjsMaterializeDirective } from './directives/tjs-materialize';

import { APIResourceService } from './services/api-resource';
import { AuthService } from './services/auth';
import { UserService } from './services/user';
import { PasswordResetService } from './services/password-reset';
import { coreConfigConstant } from './services/core-config';
import { AuthAdminGuardService } from './services/auth-admin-guard';
import { ViewMetaGuardService } from './services/view-meta-guard';

import { SafeHtmlPipe } from './pipes/safe-html';

let options: ToastOptions = new ToastOptions({
  toastLife: 5000,
  showCloseButton: true,
  positionClass: 'toast-top-right',
  animate: 'flyRight'
});

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    SlimLoadingBarModule.forRoot(),
    ToastModule.forRoot(options),
    Ng2Webstorage.forRoot({ prefix: 'rendezvous', separator: '.' }),
    HttpModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: coreConfigConstant.GOOGLE_MAPS_KEY
    }),
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    TextMaskModule,
    TinymceModule.withConfig({
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak',
        'searchreplace wordcount visualblocks visualchars code fullscreen',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
      ],
      language: 'ru',
      automatic_uploads: true,
      toolbar: `undo redo |
                styleselect |
                sizeselect |
                fontselect |
                fontsizeselect |
                bold italic |
                alignleft aligncenter alignright alignjustify |
                bullist numlist outdent indent |
                link image |
                preview |
                forecolor backcolor emoticons`,
      fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',
      file_browser_callback_types: 'file image media',
      height: 400,
      file_picker_callback: (callback: any, value: any, meta: any) => {
        if (meta.filetype === 'image') {
          $('#upload').trigger('click');
          $('#upload').on('change', (event) => {
            let target: HTMLInputElement = <HTMLInputElement> event.target;
            let files: FileList = target.files;
            let file = files[0];
            let reader = new FileReader();
            reader.onload = (e: any) => {
              callback(e.target.result, {
                alt: ''
              });
            };
            reader.readAsDataURL(file);
          });
        }
      }
    }),
    FacebookModule.forRoot(),
    ImageUploadModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    SlimLoadingBarModule,
    CustomFormsModule,
    ToastModule,
    Ng2Webstorage,
    HttpInterceptorModule,
    RatingModule,
    OwlModule,
    SebmGoogleMap,
    SebmGoogleMapMarker,
    SebmGoogleMapInfoWindow,
    AgGridNg2,
    TinymceModule,
    ImageUploadModule,

    MnFullpageDirective,
    TjsAutosizeDirective,
    TjsMaterializeDirective,
    MaskedInputDirective,

    SafeHtmlPipe
  ],
  declarations: [
    MnFullpageDirective,
    TjsAutosizeDirective,
    TjsMaterializeDirective,

    SafeHtmlPipe
  ],
  providers: [
    APIResourceService,
    MnFullpageService,
    AuthService,
    Ng2Webstorage,
    UserService,
    PasswordResetService,
    AuthAdminGuardService,
    ViewMetaGuardService
  ]
})

export class CoreModule { }
