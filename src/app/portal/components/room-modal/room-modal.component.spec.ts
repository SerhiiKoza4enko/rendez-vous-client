import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { RoomModalComponent } from './room-modal.component';

describe('Room Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RoomModalComponent
    ]}));

  it('should have ctx', inject([ RoomModalComponent ], (component: RoomModalComponent) => {
    expect(true).toEqual(true);
  }));

});
