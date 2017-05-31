import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FeedbackService } from '../../services/feedback';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'feedback-modal'
  selector: 'feedback-modal',  // <feedback-modal></feedback-modal>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    FeedbackService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./feedback-modal.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './feedback-modal.template.pug',
})

export class FeedbackModalComponent {
  public feedback: IFeedback = {
    id: '0',
    description: '',
    mark: 0,
    active: false,
    checked: false,
    user: null
  };

  constructor(
    public modalInstance: NgbActiveModal,
    private feedbackService: FeedbackService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `feedback-modal` component');
  }

  public addFeedback(): void {
    this.feedbackService.save(this.feedback)
      .$observable
      .subscribe(
      (feedback: IFeedback) => {
        this.toastr.success(`Ваш отзыв успешно добавлен и будет доступен после модерации`, '');
        this.modalInstance.close(feedback);
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
