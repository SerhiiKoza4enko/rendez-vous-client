import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { APIResourceService } from '../../../core/services/api-resource';

@Injectable()
@ResourceParams({ path: 'rooms' })
export class RoomService extends APIResourceService {

  @ResourceAction({
    isArray: true
  })
  public query: ResourceMethod<any, IRoom[]>;

  constructor(
    http: Http,
    injector: Injector,
    private router: Router
  ) {
    super(http, injector);
  }

}
