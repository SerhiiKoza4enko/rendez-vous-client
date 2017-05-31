import { Injectable, Injector } from '@angular/core';
import { Http, Request, Response } from '@angular/http';
import { Observable, Subscriber } from 'rxjs';
import { Resource, ResourceParams } from 'ng2-resource-rest';
import { LocalStorage } from 'ng2-webstorage';
import { coreConfigConstant } from '../core-config';

@Injectable()
export class APIResourceService extends Resource {

  @LocalStorage('token')
  private token: string;

  @LocalStorage('access_token')
  private accessToken: string;

  constructor(http: Http, injector: Injector) {
    super(http, injector);
    super.setUrl(coreConfigConstant.API_URL);
    super.setParams({ access_token: this.accessToken || coreConfigConstant.MASTER_KEY });
  }

  public getHeaders(): any {
    let headers: any = super.getHeaders();
    headers['Authorization'] = `Basic ${this.token}`;
    // headers['Authorization'] = `Bearer ${coreConfigConstant.MASTER_KEY}`;
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
    super.setHeaders(headers);
    return headers;
  }

  public requestInterceptor(request: Request): Request {
    return request;
  }

  public responseInterceptor(observable: Observable<any>, request?: Request): Observable<any> {
    return Observable.create((subscriber: Subscriber<any>) => {
      observable.subscribe(
        // tslint:disable-next-line:max-line-length
        (response: Response) => subscriber.next((<any> response)._body ? response.json() : response),
        (error: Response) => {
          if ((<any> error)._body) {
            try {
              subscriber.error(error.json());
            } catch (e) {
              subscriber.error(error);
            }
          } else {
            subscriber.error(error);
          }
        },
        () => subscriber.complete()
      );
    });
  }

}
