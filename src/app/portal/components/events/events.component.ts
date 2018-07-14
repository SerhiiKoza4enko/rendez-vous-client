import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EventService } from '../../services/event';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'events'
  selector: 'events',  // <events></events>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    EventService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./events.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './events.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class EventsComponent {
  public events: IEvent[];

  public owlOptions: any = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    margin: 25,
    items: 1,
    URLhashListener: true,
    startPosition: 'URLHash',
    nav: true,
    navText : [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ]
  };

  constructor(
    private eventService: EventService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `Events` component');
    this.loadEvents();
  }

  private loadEvents() {
    this.eventService.query()
      .$observable
      .subscribe((events: IEvent[]) => {
        this.events = events;
      });
  }
}
