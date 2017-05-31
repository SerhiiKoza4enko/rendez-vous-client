import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PhotoService } from '../../services/photo';
import { coreConfigConstant } from '../../../core/services/core-config';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'gallery'
  selector: 'gallery',  // <gallery></gallery>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    PhotoService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./gallery.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './gallery.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class GalleryComponent {
  public photos: IPhoto[];
  public apiUrl: string;

  public owlOptions: any = {
    loop: true,
    autoplay: false,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 25,
    items: 1,
    URLhashListener: true,
    nav: true,
    navText : [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ]
  };

  constructor(
    private photoService: PhotoService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `Gallery` component');
    this.apiUrl = coreConfigConstant.API_URL;
    this.loadPhotos();
  }

  private loadPhotos() {
    this.photoService.query()
      .$observable
      .subscribe((photos: IPhoto[]) => {
        this.photos = photos;
      });
  }
}
