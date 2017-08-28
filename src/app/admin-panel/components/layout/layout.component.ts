import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../core/services/user';
import { MnFullpageOptions, MnFullpageService } from 'ng2-fullpage';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'layout'
  selector: 'layout',  // <layout></layout>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    UserService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./layout.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './layout.template.pug'
})

export class AdminLayoutComponent implements OnInit {
  private static bgColorsMap: any = {
    1: 'rv-bg-fist-important',
    2: 'rv-bg-malahit-important',
    3: 'rv-bg-fist-important',
    4: 'rv-bg-malahit-important',
    5: 'rv-bg-fist-important',
    6: 'rv-bg-malahit-important',
    7: 'rv-bg-fist-important'
  };
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
    private router: Router
  ) {
    console.log('hello `Layout` component');
    this.loadCurrentUser();
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
      .subscribe(
      (user: IUser) => {
        this.user = user;
      }
      );
    this.pages = { id: '0', about: '' };
  }

  public logout() {
    if ($.fn.fullpage) {
      $.fn.fullpage.destroy('all');
    }
    this.userService.logout();
    this.user = undefined;
    this.fullpageService.silentMoveTo(1);
  }

  public onPageChanged(index: number, nextIndex: number, direction: string) {
    let bg = jQuery('.layout');
    bg.removeClass([
      'rv-bg-fist-important',
      'rv-bg-malahit-important'
    ].join(' '));
    bg.addClass(AdminLayoutComponent.bgColorsMap[nextIndex]);
  }
}
