import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { APIResourceService } from '../../../core/services/api-resource';

@Injectable()
@ResourceParams({ path: 'pages' })
export class PageService extends APIResourceService {

  @ResourceAction({
    isArray: true
  })
  public query: ResourceMethod<any, IPage[]>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: 'pages'
  })
  public create: ResourceMethod<IPage, IPage>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: 'pages/{!id}'
  })
  public update: ResourceMethod<IPage, IPage>;

  constructor(
    http: Http,
    injector: Injector,
    private router: Router
  ) {
    super(http, injector);
  }

}
