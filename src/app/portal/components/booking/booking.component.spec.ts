import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { BookingComponent } from './booking.component';

describe('Booking', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      BookingComponent
    ]}));

  it('should have ctx', inject([ BookingComponent ], (component: BookingComponent) => {
    expect(true).toEqual(true);
  }));

});
