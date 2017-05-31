import { Injectable } from '@angular/core';
import { Router, CanActivate, Params, ActivatedRouteSnapshot } from '@angular/router';
import { EventService } from '../../../portal/services/event';
import { ForeignService } from '../../../portal/services/foreign';
import { Meta } from '@angular/platform-browser';

@Injectable()
export class ViewMetaGuardService implements CanActivate {
  public data: IForeign | IEvent;
  private services: any;

  constructor(
    private router: Router,
    private eventService: EventService,
    private foreignService: ForeignService,
    private meta: Meta
  ) {
    this.data = <IEvent> {};
    this.services = {
      event: eventService,
      foreign: foreignService
    };
  }

  public canActivate(route: ActivatedRouteSnapshot) {
    this.meta.updateTag({ content: 'SUUUUKA' }, 'property="og:description"');
    return true;
    /*return (<any> this.services[route.params['type']]).get({ id: route.params['id'] })
      .$observable
      .map(
        (data: IForeign | IEvent) => {
          this.data = data;

          if (data && data.subject && data.subject.length) {
            this.meta.updateTag({ content: this.data.subject }, 'property="og:description"');
          }
          this.meta.updateTag({
            content: 'http://rendez-vous.lsoftwaresolutions.com/assets/images/text.png'
          }, 'property="og:image"');
          return true;
        },
        () => { return false; }
      );*/
  }
}
