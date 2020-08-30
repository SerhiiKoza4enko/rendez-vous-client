import { Component, OnInit, Input, ViewEncapsulation, Injectable } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// tslint:disable-next-line:max-classes-per-file
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'room-modal'
  selector: 'room-modal',  // <room-modal></room-modal>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./room-modal.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './room-modal.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class RoomModalComponent {
  @Input() public room: IRoom;

  constructor(public modalInstance: NgbActiveModal) {
    console.log('hello `room-modal` component');
  }
}
