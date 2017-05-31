import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Meta } from '@angular/platform-browser';
import { LocalStorageService } from 'ng2-webstorage';
import { EventService } from '../../services/event';
import { ForeignService } from '../../services/foreign';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'article-view'
  selector: 'article-view',  // <article-view></article-view>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    EventService,
    ForeignService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./article-view.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './article-view.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class ArticleViewComponent implements OnInit {
  public type: string;
  public id: string;
  public data: IForeign | IEvent;
  public user: IUser;
  private services: any;

  constructor(
    private eventService: EventService,
    private foreignService: ForeignService,
    private toastr: ToastsManager,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: LocalStorageService,
    private meta: Meta
  ) {
    console.log('hello `Article View` component');
    this.user = this.storage.retrieve('currentuser');
    this.data = <IEvent> {};
    this.services = {
      event: eventService,
      foreign: foreignService
    };
    activatedRoute.params
      .subscribe(
      (params: Params) => {
        this.type = params['type'];
        this.id = params['id'];
        this.loadData(this.type, this.id);
      },
      () => null
      );
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

  private loadData(type: string, dataId: string): void {
    (<any> this.services[type]).get({ id: dataId })
      .$observable
      .subscribe(
      (data: IForeign | IEvent) => {
        if (data && data.subject && data.subject.length) {
          this.meta.updateTag({ content: data.subject }, 'property="og:description"');
        }
        this.meta.updateTag({
          content: 'http://rendez-vous.lsoftwaresolutions.com/assets/images/text.png'
        }, 'property="og:image"');
        this.data = data;
      },
      () => null
      );
  }
}
