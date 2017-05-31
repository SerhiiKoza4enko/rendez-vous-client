import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { APIResourceService } from '../../../core/services/api-resource';

@Injectable()
@ResourceParams({ path: 'articles' })
export class EventService extends APIResourceService {

  @ResourceAction({
    isArray: true
  })
  public query: ResourceMethod<any, IEvent[]>;

  @ResourceAction({
    path: '/articles/{!id}'
  })
  public get: ResourceMethod<{id: any}, IEvent>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  public save: ResourceMethod<IEvent, IEvent>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: 'articles/{!id}'
  })
  public update: ResourceMethod<IEvent, IEvent>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: 'articles/{!id}'
  })
  public remove: ResourceMethod<{ id: any }, any>;

  constructor(
    http: Http,
    injector: Injector,
    private router: Router
  ) {
    super(http, injector);
  }

}
