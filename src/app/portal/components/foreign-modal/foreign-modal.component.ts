import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ForeignService } from '../../services/foreign';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'foreign-modal'
  selector: 'foreign-modal',  // <foreign-modal></foreign-modal>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    ForeignService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./foreign-modal.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './foreign-modal.template.pug',
})

export class ForeignModalComponent implements OnInit {
  public foreign: IForeign = {
    id: '0',
    subject: '',
    description: '',
    active: false,
    checked: false,
    user: null
  };
  public content: FormControl;

  constructor(
    public modalInstance: NgbActiveModal,
    private foreignService: ForeignService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `foreign-modal` component');
    this.content = new FormControl();
  }

  public ngOnInit(): void {
    this.content.setValue(this.foreign.description);
  }

  public addForeign(): void {
    this.foreign.description = this.content.value;
    this.foreignService.save(this.foreign)
      .$observable
      .subscribe(
      (foreign: IForeign) => {
        this.toastr.success(`Ваша статья успешно добавлена и будет доступна после модерации`, '');
        this.modalInstance.close(foreign);
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
