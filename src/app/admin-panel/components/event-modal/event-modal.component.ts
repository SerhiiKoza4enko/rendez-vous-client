import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EventService } from '../../../portal/services/event';
import { coreConfigConstant } from '../../../core/services/core-config';
import {
  FacebookService,
  InitParams,
  UIParams,
  UIResponse,
  LoginResponse
} from 'ng2-facebook-sdk';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'event-modal'
  selector: 'event-modal',  // <event-modal></event-modal>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    EventService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./event-modal.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './event-modal.template.pug',
})

export class AdminEventModalComponent implements OnInit {
  @Input()
  public event: IEvent;
  public content: FormControl;

  constructor(
    public modalInstance: NgbActiveModal,
    private eventService: EventService,
    private toastr: ToastsManager,
    private router: Router,
    private fb: FacebookService
  ) {
    console.log('hello `event-modal` component');
    let initParams: InitParams = {
      appId: '753259471522465',
      xfbml: false,
      cookie: false,
      version: 'v2.9'
    };

    this.fb.init(initParams);

    this.content = new FormControl();
  }

  public ngOnInit(): void {
    this.content.setValue(this.event.description);
  }

  public share(): void {
    let url: string = coreConfigConstant.URL + '/#events';
    // let url: string = coreConfigConstant.URL + '/view/event/' + this.event.id;
    let el: HTMLElement = document.createElement('html');
    el.innerHTML = this.content.value;
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
          'og:description': this.event.subject,
          'og:image': image
        }
      })
    };

    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
  }

  public addEvent(): void {
    this.event.description = this.content.value;
    this.modalInstance.close(this.event);
  }

  public changeContent(event: any): void {
    console.log(event);
  }
}
