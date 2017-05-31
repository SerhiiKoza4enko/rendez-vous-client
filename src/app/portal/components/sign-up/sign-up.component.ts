import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MaskedInputDirective, conformToMask } from 'angular2-text-mask';

import { LocalStorageService } from 'ng2-webstorage';
import { AuthService } from '../../../core/services/auth';
import { UserService } from '../../../core/services/user';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'sign-up'
  selector: 'sign-up',  // <sign-up></sign-up>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    AuthService,
    UserService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./sign-up.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './sign-up.template.pug'
})

export class SignUpComponent implements OnInit {
  public signUpModel: any = <IUser> {};
  public phoneMask: any =
    ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public modalInstance: NgbActiveModal,
    private toastr: ToastsManager,
    private storage: LocalStorageService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
    console.log('hello `Sign Up` component');
  }

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void { }

  public signUp() {
    this.userService.save(this.signUpModel)
      .$observable
      .subscribe(
      (user: IUser) => {
        this.toastr.success(`Вы успешно зарегестрированы.`, 'Поздравляем!');
        this.storage.store('token', btoa(`${user.email}:${this.signUpModel.password}`));
        this.authService.save(this.signUpModel)
          .$observable
          .subscribe(
          (authInfo: IAuth) => {
            this.storage.store('currentUser', authInfo.user);
            this.modalInstance.close({ user: authInfo.user, needSignIn: false });
            let message: string = `Привет, ${authInfo.user.firstname}.`;
            this.toastr.success(message, 'Добро пожаловать!');
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

  public signIn() {
    this.modalInstance.close({ user: null, needSignIn: true });
  }
}
