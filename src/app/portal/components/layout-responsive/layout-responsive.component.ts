import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../../core/services/user';
import { MnFullpageOptions, MnFullpageService } from 'ng2-fullpage';
import { LocalStorageService } from 'ng2-webstorage';
import { PageService } from '../../services/page';
import { SignInComponent } from '../sign-in';
import { SignUpComponent } from '../sign-up';
import { ProfileComponent } from '../profile';
import { BookingComponent } from '../booking';
import * as Popper from 'popper.js/dist/umd/popper.js';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'layout-responsive'
  selector: 'layout-responsive',  // <layout-responsive></layout-responsive>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    UserService,
    PageService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./layout-responsive.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './layout-responsive.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class LayoutResponsiveComponent implements OnInit {
  public user: IUser;
  public pages: IPage;
  public tooltips: string[] = [];

  public options: MnFullpageOptions = new MnFullpageOptions({
    sectionSelector: '.section:visible',
    controlArrows: false,
    scrollingSpeed: 1000,
    menu: '.menu',
    css3: true,
    // anchors: ['main', 'events', 'contacts', 'feedbacks', 'booking']
  });

  constructor(
    private modalService: NgbModal,
    public fullpageService: MnFullpageService,
    private userService: UserService,
    private pageService: PageService,
    private storage: LocalStorageService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `LayoutResponsive` component');
    this.loadCurrentUser();
    this.loadPages();
  }

  public ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scroll, true);
  }

  public scroll(): void {
    if ($('#mainNav').offset().top > 100) {
      $('#mainNav').addClass('navbar-shrink');
    } else {
      $('#mainNav').removeClass('navbar-shrink');
    }
  }

  public loadCurrentUser(): void {
    this.userService.current()
      .$observable
      .subscribe((user: IUser) => {
        this.user = user;
      }, () => null);
    this.pages = { id: '0', about: '' };
  }

  public signIn(): void {
    const modalRef = this.modalService.open(SignInComponent, { backdrop: 'static' });
    modalRef.result.then((result: any) => {
      if (result.needSignUp) {
        this.signUp();
        return;
      }
      if (result.user) {
        this.user = result.user;
      }
    });
  }

  public signUp(): void {
    const modalRef = this.modalService.open(SignUpComponent, { backdrop: 'static' });
    modalRef.result.then((result: any) => {
      if (result.needSignIn) {
        this.signIn();
        return;
      }
      if (result.user) {
        this.user = result.user;
      }
    });
  }

  public profile(): void {
    const modalRef = this.modalService.open(ProfileComponent, { backdrop: 'static' });
    modalRef.componentInstance.user = this.user;
    modalRef.result.then((user: IUser) => {
      if (user) {
        this.storage.store('currentUser', user);
        this.user = user;
      }
    });
  }

  public logout() {
    this.userService.logout();
    this.user = undefined;
    this.fullpageService.silentMoveTo(1);
  }

  public loadPages() {
    this.pageService.query()
      .$observable
      .subscribe((pages: IPage[]) => this.pages = pages[0],
      () => this.pages = <IPage>{});
  }
}
