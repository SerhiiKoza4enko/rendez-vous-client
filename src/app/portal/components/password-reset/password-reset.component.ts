import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { coreConfigConstant } from '../../../core/services/core-config';
import { PasswordResetService } from '../../../core/services/password-reset';
import { UserService } from '../../../core/services/user';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'password-reset'
  selector: 'password-reset',  // <password-reset></password-reset>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    PasswordResetService,
    UserService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: [ './password-reset.style.scss' ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './password-reset.template.pug'
})

export class PasswordResetComponent implements OnInit {
  public passwordResetModel: IPasswordResetQueryInput = {
    link: `${coreConfigConstant.URL}password-reset`
  };

  constructor(
    private toastr: ToastsManager,
    private router: Router,
    private passwordResetService: PasswordResetService,
    userService: UserService
  ) {
    console.log('hello `Password Reset` component');
    userService.current()
      .$observable
      .subscribe(
        (user: IUser) => router.navigate(['/home'])
      );
  }

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void { }

  public sendPasswordResetEmail() {
    this.passwordResetService.save(this.passwordResetModel)
      .$observable
      .subscribe(
        () => {
          this.toastr.success(`An email was sent to ${this.passwordResetModel.email}.`, 'Success!');
          this.router.navigate(['/']);
        },
        (error: any) => {
          let message: string = 'Something went wrong...';
          if (error && error.message) {
            message = error.message;
          }
          this.toastr.error(message, 'Oops!');
        }
      );
  }
}
