import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { ResourceParams, ResourceAction, ResourceMethod } from 'ng2-resource-rest';
import { Http, RequestMethod } from '@angular/http';
import { APIResourceService } from '../../../core/services/api-resource';

@Injectable()
@ResourceParams({ path: 'feedbacks' })
export class FeedbackService extends APIResourceService {

  @ResourceAction({
    isArray: true
  })
  public query: ResourceMethod<any, IFeedback[]>;

  @ResourceAction({
    method: RequestMethod.Post
  })
  public save: ResourceMethod<IFeedback, IFeedback>;

  @ResourceAction({
    method: RequestMethod.Put,
    path: 'feedbacks/{!id}'
  })
  public update: ResourceMethod<IFeedback, IFeedback>;

  @ResourceAction({
    method: RequestMethod.Delete,
    path: '/feedbacks/{!id}'
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
