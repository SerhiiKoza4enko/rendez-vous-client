import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { LocalStorageService } from 'ng2-webstorage';
import { APIResourceService } from '../api-resource';

@Injectable()
@ResourceParams({ path: 'users' })
export class UserService extends APIResourceService {

  @ResourceAction({
    isArray: true
  })
  public query: ResourceMethod<IUserQueryInput, IUser[]>;

  @ResourceAction({
    path: 'users/{!id}'
  })
  public get: ResourceMethod<{id: any}, IUser>;

  @ResourceAction({
    path: 'users/me'
  })
  public current: ResourceMethod<any, IUser>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  public save: ResourceMethod<IUserRegistrationRequest, IUser>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: 'users/{!id}'
  })
  public update: ResourceMethod<IUserUpdateRequest, IUser>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: 'users/{!id}'
  })
  public remove: ResourceMethod<{ id: any }, any>;

  constructor(
    http: Http,
    injector: Injector,
    private storage: LocalStorageService,
    private router: Router
  ) {
    super(http, injector);
  }

  public logout() {
    this.storage.clear('token');
    this.storage.clear('access_token');
    this.storage.clear('currentUser');
    this.router.navigate(['/']);
  }

}
