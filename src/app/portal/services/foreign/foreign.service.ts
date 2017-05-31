import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { APIResourceService } from '../../../core/services/api-resource';

@Injectable()
@ResourceParams({ path: 'foreigns' })
export class ForeignService extends APIResourceService {

  @ResourceAction({
    isArray: true
  })
  public query: ResourceMethod<any, IForeign[]>;

  @ResourceAction({
    path: '/foreigns/{!id}'
  })
  public get: ResourceMethod<{id: any}, IForeign>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  public save: ResourceMethod<IForeign, IForeign>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: 'foreigns/{!id}'
  })
  public update: ResourceMethod<IForeign, IForeign>;

  constructor(
    http: Http,
    injector: Injector,
    private router: Router
  ) {
    super(http, injector);
  }

}
