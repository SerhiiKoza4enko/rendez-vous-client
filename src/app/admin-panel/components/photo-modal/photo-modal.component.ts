import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { PhotoService } from '../../../portal/services/photo';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'photo-modal'
  selector: 'photo-modal',  // <photo-modal></photo-modal>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    PhotoService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./photo-modal.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './photo-modal.template.pug',
})

export class AdminPhotoModalComponent implements OnInit {
  @Input()
  public photo: IPhoto;
  public url: string;

  constructor(
    public modalInstance: NgbActiveModal,
    private photoService: PhotoService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `photo-modal` component');
  }

  public ngOnInit(): void {
    if (this.photo && this.photo.image) {
      this.url = this.photo.image;
    }
  }

  public addPhoto(): void {
    this.modalInstance.close(this.photo);
  }

  public readUrl(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let reader: FileReader = new FileReader();
      reader.onload = (data: any) => {
        this.photo.image = data.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
