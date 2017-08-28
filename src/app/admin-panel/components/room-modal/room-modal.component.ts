import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { RoomService } from '../../../portal/services/room';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'room-modal'
  selector: 'room-modal',  // <room-modal></room-modal>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    RoomService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./room-modal.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './room-modal.template.pug',
})

export class AdminRoomModalComponent implements OnInit {
  @Input()
  public room: IRoom;
  public url: string;

  constructor(
    public modalInstance: NgbActiveModal,
    private roomService: RoomService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `room-modal` component');
  }

  public ngOnInit(): void {
    if (this.room && this.room.image) {
      this.url = this.room.image;
    }
  }

  public addRoom(): void {
    this.modalInstance.close(this.room);
  }

  public readUrl(event: any): void {
    if (event.target.files && event.target.files[0]) {
      let reader: FileReader = new FileReader();
      reader.onload = (data: any) => {
        this.room.image = data.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
