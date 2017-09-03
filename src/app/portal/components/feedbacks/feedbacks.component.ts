import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import * as swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { OwlModule } from 'ng2-owl-carousel';
import { LocalStorageService } from 'ng2-webstorage';
import { FeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { FeedbackService } from '../../services/feedback';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'feedbacks'
  selector: 'feedbacks',  // <feedbacks></feedbacks>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    FeedbackService,
    LocalStorageService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./feedbacks.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './feedbacks.template.pug'
})

export class FeedbacksComponent implements OnInit {
  public feedbacks: IFeedback[];
  public user: IUser; // = { id: '0', email: '' };

  public owlOptions: any = {
    loop: true,
    autoplay: false,
    autoplayHoverPause: true,
    margin: 25,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      1200: {
        items: 3
      }
    },
    nav: true,
    navText : [
      '<i class="fa fa-angle-left" aria-hidden="true"></i>',
      '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ]
  };

  constructor(
    private modalService: NgbModal,
    private feedbackService: FeedbackService,
    private toastr: ToastsManager,
    private storage: LocalStorageService,
    private router: Router
  ) {
    console.log('hello `Feedbacks` component');
    this.user = this.storage.retrieve('currentuser');
    if (!this.user) {
      this.user = <IUser> { id: ''};
    }
    this.loadFeedbacks();
  }

  public ngOnInit(): void {
    this.storage.observe('currentuser').subscribe((user: any) => {
      if (user) {
        this.user = user;
      } else {
        this.user = <IUser> { id: '' };
      }
    });
  }

  public addFeedback(): void {
    const modalRef = this.modalService.open(FeedbackModalComponent, { backdrop: 'static' });
    modalRef.result.then(
      () => null,
      () => null
    );
  }

  public remove(feedback, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    (<any> swal)({
      title: 'Удалить?',
      // tslint:disable-next-line:max-line-length
      text: `Вы уверены, что хотите удалить этот отзыв? Вы не сможете восстановить его после удаления!`,
      type: 'warning',
      reverseButtons: true,
      focusCancel: true,
      showCancelButton: true,
      buttonsStyling: false,
      showCloseButton: true,
      confirmButtonClass: 'btn btn-danger margin-5 d5-init-ripples',
      confirmButtonText: 'Да, удалить отзыв!',
      cancelButtonClass: 'btn btn-default margin-5 d5-init-ripples',
      cancelButtonText: 'Нет!'
    })
      .then(() => {
        this.feedbackService.remove({ id: feedback.id })
          .$observable
          .subscribe(
          () => {
            (<any> swal)({
              title: 'Удален!',
              text: 'Отзыв был успешно удален.',
              type: 'success',
              confirmButtonClass: 'btn btn-primary d5-init-ripples',
              buttonsStyling: false,
              showCloseButton: true
            });
            let index: number = this.feedbacks.findIndex((e: IFeedback) => e.id === feedback.id);
            if (index !== -1) {
              this.feedbacks.splice(index, 1);
              this.updateOwlResponsive(this.feedbacks);
            }
          },
          () => {
            (<any> swal)({
              title: 'Ошибка...',
              text: 'Что-то пошло не так.',
              type: 'error',
              confirmButtonClass: 'btn btn-primary d5-init-ripples',
              buttonsStyling: false,
              showCloseButton: true
            });
          }
          );
      })
      .catch((<any> swal).noop);
  }

  private loadFeedbacks() {
    this.feedbackService.query()
      .$observable
      .subscribe((feedbacks: IFeedback[]) => {
        this.feedbacks = feedbacks;
        this.updateOwlResponsive(feedbacks);
      });
  }

  private updateOwlResponsive(feedbacks: IFeedback[]): void {
    switch (this.feedbacks.length) {
      case 1:
        this.owlOptions.responsive = {
          0: { items: 1 }
        };
        break;
      case 2:
        this.owlOptions.responsive = {
          0: { items: 1 },
          768: { items: 2 } };
        break;
      default:
        this.owlOptions.responsive = {
          0: { items: 1 },
          768: { items: 2 },
          1200: { items: 3 }
        };
        break;
    }
  }
}
