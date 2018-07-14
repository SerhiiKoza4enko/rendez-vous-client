import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LocalStorageService } from 'ng2-webstorage';
import { ForeignService } from '../../services/foreign';

import { ForeignModalComponent } from '../foreign-modal';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'foreigns'
  selector: 'foreigns',  // <foreigns></foreigns>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    ForeignService,
    LocalStorageService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./foreigns.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './foreigns.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class ForeignsComponent implements OnInit {
  public foreigns: IForeign[];
  public user: IUser;

  public owlOptions: any = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 25,
    items: 1,
    nav: true,
    navText : [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ]
  };

  constructor(
    private modalService: NgbModal,
    private foreignService: ForeignService,
    private toastr: ToastsManager,
    private storage: LocalStorageService,
    private router: Router
  ) {
    console.log('hello `Foreigns` component');
    this.user = this.storage.retrieve('currentuser');
    if (!this.user) {
      this.user = <IUser> { id: '' };
    }
    this.loadForeigns();
  }

  public ngOnInit(): void {
    this.storage.observe('currentuser').subscribe((user: any) => {
      if (user) {
        this.user = user;
      } else {
        this.user = <IUser> { id: '' };
      }
    });
  }

  public addForeign(): void {
    const modalRef = this.modalService.open(ForeignModalComponent, { backdrop: 'static' });
    modalRef.result.then(
      () => null,
      () => null
    );
  }

  private loadForeigns() {
    this.foreignService.query()
      .$observable
      .subscribe((foreigns: IForeign[]) => {
        this.foreigns = foreigns;
      });
  }
}
