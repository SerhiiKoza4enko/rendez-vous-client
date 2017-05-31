import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BookingModalComponent } from './booking-modal.component';

describe('Feedback Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BookingModalComponent
    ]}));

  it('should have ctx', inject([ BookingModalComponent ], (component: BookingModalComponent) => {
    expect(true).toEqual(true);
  }));

});
