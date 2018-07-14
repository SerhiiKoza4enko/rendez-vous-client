import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../core/services/user';
import { MnFullpageOptions, MnFullpageService } from 'ng2-fullpage';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'layout-responsive'
  selector: 'layout-responsive',  // <layout-responsive></layout-responsive>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    UserService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./layout-responsive.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './layout-responsive.template.pug'
})

export class AdminLayoutResponsiveComponent implements OnInit {
  // tslint:disable-next-line:member-access
  @ViewChild('navbarToggler') navbarToggler: ElementRef;
  public user: IUser;
  public pages: IPage;
  public tooltips: string[] = [];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private router: Router
  ) {
    console.log('hello `Layout` component');
    this.loadCurrentUser();
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

  public collapseNav(): void {
    this.navbarToggler.nativeElement.click();
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
    this.userService.logout();
    this.user = undefined;
  }
}
