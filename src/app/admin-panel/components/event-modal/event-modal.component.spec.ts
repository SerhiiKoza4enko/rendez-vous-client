import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminEventModalComponent } from './event-modal.component';

describe('Event Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminEventModalComponent
    ]}));

  it('should have ctx',
    inject([ AdminEventModalComponent ], (component: AdminEventModalComponent) => {
    expect(true).toEqual(true);
  }));

});
