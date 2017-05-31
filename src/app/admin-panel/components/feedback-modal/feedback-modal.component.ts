import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FeedbackService } from '../../../portal/services/feedback';

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

export class AdminFeedbackModalComponent {
  @Input()
  public feedback: IFeedback;

  constructor(
    public modalInstance: NgbActiveModal,
    private feedbackService: FeedbackService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `feedback-modal` component');
  }

  public forbid(): void {
    this.feedback.active = false;
    this.feedback.checked = true;
    this.modalInstance.close(this.feedback);
  }

  public allow(): void {
    this.feedback.active = true;
    this.feedback.checked = true;
    this.modalInstance.close(this.feedback);
  }
}
