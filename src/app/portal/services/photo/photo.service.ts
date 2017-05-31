import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { APIResourceService } from '../../../core/services/api-resource';

@Injectable()
@ResourceParams({ path: 'photos' })
export class PhotoService extends APIResourceService {

  @ResourceAction({
    isArray: true
  })
  public query: ResourceMethod<any, IPhoto[]>;

  @ResourceAction({
    path: '/photos/{!id}'
  })
  public get: ResourceMethod<{id: any}, IPhoto>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  public save: ResourceMethod<IPhoto, IPhoto>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/photos/{!id}'
  })
  public update: ResourceMethod<IPhoto, IPhoto>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/photos/{!id}'
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
