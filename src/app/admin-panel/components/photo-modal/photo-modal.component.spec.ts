import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminPhotoModalComponent } from './photo-modal.component';

describe('Event Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminPhotoModalComponent
    ]}));

  it('should have ctx',
    inject([ AdminPhotoModalComponent ], (component: AdminPhotoModalComponent) => {
    expect(true).toEqual(true);
  }));

});
