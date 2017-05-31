import { Injectable, Injector } from '@angular/core';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { APIResourceService } from '../api-resource';

@Injectable()
@ResourceParams({ path: 'password-resets' })
export class PasswordResetService extends APIResourceService {

  @ResourceAction({
    path: '/{!token}'
  })
  public get: ResourceMethod<{ token: string }, IPasswordReset>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  public save: ResourceMethod<IPasswordResetQueryInput, any>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: '/{!token}'
  })
  public update: ResourceMethod<{ token: string, password: string }, IPasswordReset>;

  constructor(http: Http, injector: Injector) {
    super(http, injector);
  }

}
