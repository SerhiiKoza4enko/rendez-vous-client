import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminRoomModalComponent } from './room-modal.component';

describe('Event Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminRoomModalComponent
    ]}));

  it('should have ctx',
    inject([ AdminRoomModalComponent ], (component: AdminRoomModalComponent) => {
    expect(true).toEqual(true);
  }));

});
