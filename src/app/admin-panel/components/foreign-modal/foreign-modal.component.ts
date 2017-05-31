import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ForeignService } from '../../../portal/services/foreign';
import { coreConfigConstant } from '../../../core/services/core-config';
import {
  FacebookService,
  InitParams,
  UIParams,
  UIResponse
} from 'ng2-facebook-sdk';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'foreign-modal'
  selector: 'foreign-modal',  // <foreign-modal></foreign-modal>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    ForeignService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./foreign-modal.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './foreign-modal.template.pug',
})

export class AdminForeignModalComponent {
  @Input()
  public foreign: IForeign;

  constructor(
    public modalInstance: NgbActiveModal,
    private foreignService: ForeignService,
    private toastr: ToastsManager,
    private router: Router,
    private fb: FacebookService
  ) {
    console.log('hello `foreign-modal` component');

    let initParams: InitParams = {
      appId: '753259471522465',
      xfbml: true,
      version: 'v2.9'
    };

    fb.init(initParams);
  }

  public share(): void {
    let url: string = coreConfigConstant.URL + '/#foreign';
    // let url: string = coreConfigConstant.URL + '/view/foreign/' + this.foreign.id;
    let el: HTMLElement = document.createElement('html');
    el.innerHTML = this.foreign.description;
    let images: any = el.getElementsByTagName('img');
    let image = images.length
      ? images[0].src
      : 'http://rendez-vous.lsoftwaresolutions.com/assets/images/text.png';
    let params: UIParams = {
      method: 'share_open_graph',
      action_type: 'og:share',
      action_properties: JSON.stringify({
        object: {
          'og:url': url,
          'og:title': 'Rendez Vous',
          'og:description': this.foreign.subject,
          'og:image': image
        }
      })
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
  }

  public forbid(): void {
    this.foreign.active = false;
    this.foreign.checked = true;
    this.modalInstance.close(this.foreign);
  }

  public allow(): void {
    this.foreign.active = true;
    this.foreign.checked = true;
    this.modalInstance.close(this.foreign);
  }
}
