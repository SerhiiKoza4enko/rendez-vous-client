import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MaskedInputDirective, conformToMask } from 'angular2-text-mask';

import { LocalStorageService } from 'ng2-webstorage';
import { UserService } from '../../../core/services/user';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'profile'
  selector: 'profile',  // <profile></profile>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    UserService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./profile.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './profile.template.pug'
})

export class ProfileComponent implements OnInit {
  public user: IUser;
  public phoneMask: any =
    ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    public modalInstance: NgbActiveModal,
    private toastr: ToastsManager,
    private storage: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) {
    console.log('hello `Profile` component');
  }

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void { }

  public updateUser() {
    this.userService.update(this.user)
      .$observable
      .subscribe(
      (user: IUser) => {
        this.toastr.success(`Вы успешно обновили свои данные.`, 'Поздравляем!');
        this.modalInstance.close(user);
      },
      (error: any) => {
        let message: string = 'Что-то пошло не так...';
        if (error && error.message) {
          message = error.message;
        }
        this.toastr.error(message, 'Oops!');
      }
      );
  }
}
