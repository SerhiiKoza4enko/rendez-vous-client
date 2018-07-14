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

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'layout'
  selector: 'layout',  // <layout></layout>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    UserService,
    PageService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./layout.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './layout.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class LayoutComponent implements OnInit {
  private static bgColorsMap: any = {
    1: 'rv-bg-fist-important',
    2: 'rv-bg-malahit-important',
    3: 'rv-bg-fist-important',
    4: 'rv-bg-malahit-important',
    5: 'rv-bg-fist-important',
    6: 'rv-bg-malahit-important'
  };
  private static scope: any;
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
    console.log('hello `Layout` component');
    LayoutComponent.scope = this;
    this.loadCurrentUser();
    this.loadPages();
  }

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void { }

  // tslint:disable-next-line:use-life-cycle-interface
  public ngOnDestroy(): void {
    if ($.fn.fullpage) {
      $.fn.fullpage.destroy('all');
    }
  }

  public loadCurrentUser(): void {
    this.userService.current()
      .$observable
      .subscribe((user: IUser) => {
        if ($.fn.fullpage && user.role !== 'admin') {
          $.fn.fullpage.destroy('all');
        }
        this.user = user;
      }, () => null);
    this.pages = { id: '0', about: '' };
  }

  public signIn(): void {
    $.fn.fullpage.setMouseWheelScrolling(false);
    const modalRef = this.modalService.open(SignInComponent, { backdrop: 'static' });
    modalRef.result.then((result: any) => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      if (result.needSignUp) {
        this.signUp();
        return;
      }
      if (result.user) {
        this.user = result.user;
        if (this.user.role !== 'admin') {
          if ($.fn.fullpage) {
            $.fn.fullpage.destroy('all');
          }
        }
      }
    }, () => $.fn.fullpage.setMouseWheelScrolling(true));
  }

  public signUp(): void {
    $.fn.fullpage.setMouseWheelScrolling(false);
    const modalRef = this.modalService.open(SignUpComponent, { backdrop: 'static' });
    modalRef.result.then((result: any) => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      if (result.needSignIn) {
        this.signIn();
        return;
      }
      if (result.user) {
        this.user = result.user;
        if ($.fn.fullpage) {
          $.fn.fullpage.destroy('all');
        }
      }
    }, () => $.fn.fullpage.setMouseWheelScrolling(true));
  }

  public profile(): void {
    $.fn.fullpage.setMouseWheelScrolling(false);
    const modalRef = this.modalService.open(ProfileComponent, { backdrop: 'static' });
    modalRef.componentInstance.user = this.user;
    modalRef.result.then((user: IUser) => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      if (user) {
        this.storage.store('currentUser', user);
        this.user = user;
      }
    }, () => $.fn.fullpage.setMouseWheelScrolling(true));
  }

  public logout() {
    if (this.user.role !== 'admin') {
      if ($.fn.fullpage) {
        $.fn.fullpage.destroy('all');
      }
    }
    this.userService.logout();
    this.user = undefined;
  }

  public loadPages() {
    this.pageService.query()
      .$observable
      .subscribe((pages: IPage[]) => this.pages = pages[0],
      () => this.pages = <IPage> {});
  }

  public onPageChanged(index: number, nextIndex: number, direction: string) {
    let bg = jQuery('.layout');
    bg.removeClass([
      'rv-bg-fist-important',
      'rv-bg-malahit-important'
    ].join(' '));
    bg.addClass(LayoutComponent.bgColorsMap[nextIndex]);
  }
}
