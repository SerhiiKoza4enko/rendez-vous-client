import { Injectable, Injector } from '@angular/core';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod, Request, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { LocalStorageService } from 'ng2-webstorage';
import { APIResourceService } from '../api-resource';

@Injectable()
@ResourceParams({ path: 'auth' })
export class AuthService extends APIResourceService {

  @ResourceAction({
    method: RequestMethod.Post
  })
  public save: ResourceMethod<IToken, IAuth>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/facebook'
  })
  public facebook: ResourceMethod<IToken, IAuth>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/github'
  })
  public github: ResourceMethod<IToken, IAuth>;

  @ResourceAction({
    method: RequestMethod.Post,
    path: '/google'
  })
  public google: ResourceMethod<IToken, IAuth>;

  constructor(http: Http, injector: Injector, private storage: LocalStorageService) {
    super(http, injector);
  }

  public responseInterceptor(observable: Observable<any>, request?: Request): Observable<any> {
    return Observable.create((subscriber: Subscriber<any>) => {
      observable.subscribe(
        (response: Response) => {
          if ((<any> response)._body) {
            try {
              let authInfo: IAuth = response.json();
              if (authInfo && authInfo.token && !authInfo.user.banned) {
                this.storage.store('access_token', authInfo.token);
              }
              subscriber.next(authInfo);
            } catch (e) {
              subscriber.next(response);
            }
          } else {
            subscriber.next(response);
          }
        },
        (error: Response) => subscriber.error(error),
        () => subscriber.complete()
      );
    });
  }

}
