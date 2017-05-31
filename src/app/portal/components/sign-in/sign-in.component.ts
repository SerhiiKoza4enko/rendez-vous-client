import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LocalStorageService } from 'ng2-webstorage';
import { AuthService } from '../../../core/services/auth';
import { UserService } from '../../../core/services/user';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'sign-in'
  selector: 'sign-in',  // <sign-in></sign-in>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    AuthService,
    UserService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./sign-in.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './sign-in.template.pug'
})

export class SignInComponent {
  public signInModel: any = {};

  constructor(
    public modalInstance: NgbActiveModal,
    private toastr: ToastsManager,
    private storage: LocalStorageService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    console.log('hello `Sign In` component');
  }

  public signIn() {
    this.storage.store('token', btoa(`${this.signInModel.email}:${this.signInModel.password}`));
    this.authService.save(this.signInModel)
      .$observable
      .subscribe(
      (authInfo: IAuth) => {
        if (authInfo.user.banned) {
          this.toastr.error('Вы были заблокированы администратором данного сайта!', 'Oops!');
          return;
        }
        this.storage.store('currentUser', authInfo.user);
        this.modalInstance.close({ user: authInfo.user, needSignUp: false });
        this.toastr.success(
          `Привет, ${authInfo.user.firstname}.`,
          'Добро пожаловать!'
        );
      },
      (error: any) => {
        this.storage.clear('currentUser');
        let message: string = 'Что-то пошло не так...';
        if (error && error.message) {
          message = error.message;
        }
        this.toastr.error(message, 'Oops!');
      }
      );
  }

  public signUp() {
    this.modalInstance.close({ user: null, needSignUp: true });
  }
}
