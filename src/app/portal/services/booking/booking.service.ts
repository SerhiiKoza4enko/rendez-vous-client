import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { APIResourceService } from '../../../core/services/api-resource';
import { CalendarEvent } from 'angular-calendar';

@Injectable()
@ResourceParams({ path: 'bookings' })
export class BookingService extends APIResourceService {

  @ResourceAction({
    isArray: true,
    path: 'bookings/{!year}/{!month}'
  })
  public query: ResourceMethod<any, IBooking[]>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  public save: ResourceMethod<IBooking, any>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: 'bookings/{!id}?all={!all}'
  })
  public delete: ResourceMethod<any, any>;

  constructor(
    http: Http,
    injector: Injector,
    private router: Router
  ) {
    super(http, injector);
  }

}
