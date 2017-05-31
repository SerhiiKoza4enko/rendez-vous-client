import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminBookingComponent } from './booking.component';

describe('Booking', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminBookingComponent
    ]}));

  it('should have ctx', inject([ AdminBookingComponent ], (component: AdminBookingComponent) => {
    expect(true).toEqual(true);
  }));

});
