/*
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewContainerRef
} from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpInterceptorService } from 'ng2-http-interceptor';
import { ToastsManager } from 'ng2-toastr';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.template.pug'
})

export class AppComponent implements OnInit {
  private httpRequestsCount: number = 0;
  private subscription: Subscription;
  private isLoading: boolean = false;
  private isHttpLoading: boolean = false;
  private isRouterLoading: boolean = false;

  constructor(
    public appState: AppState,
    public vRef: ViewContainerRef,
    public router: Router,
    public httpInterceptor: HttpInterceptorService,
    public toastr: ToastsManager,
    public slimLoader: SlimLoadingBarService
  ) {
    toastr.setRootViewContainerRef(vRef);

    slimLoader.start();

    // Listen the http requests to start or complete the slim bar loading
    httpInterceptor.request().addInterceptor((data: any, method: string) => {
      this.httpRequestsCount++;
      if (!this.isLoading) {
        slimLoader.start();
        this.isLoading = true;
        this.isHttpLoading = true;
      }
      return data;
    });

    httpInterceptor.response().addInterceptor((res: any, method: string) => {
      this.httpRequestsCount--;
      if (this.httpRequestsCount === 0 && this.isLoading) {
        if (!this.isRouterLoading) {
          slimLoader.complete();
        }
        this.isLoading = false;
        this.isHttpLoading = false;
      }
      return res;
    });

    // Listen the navigation events to start or complete the slim bar loading
    this.subscription = router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (!this.isLoading) {
          slimLoader.start();
          this.isLoading = true;
          this.isRouterLoading = true;
        }
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        if (this.isLoading) {
          if (!this.isHttpLoading) {
            slimLoader.complete();
          }
          this.isLoading = false;
          this.isRouterLoading = false;
        }
      }
    }, () => {
      if (this.isLoading) {
        if (!this.isHttpLoading) {
          slimLoader.complete();
        }
        this.isLoading = false;
        this.isRouterLoading = false;
      }
    });
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
