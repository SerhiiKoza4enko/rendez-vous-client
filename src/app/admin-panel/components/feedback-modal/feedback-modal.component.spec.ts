import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminFeedbackModalComponent } from './feedback-modal.component';

describe('Feedback Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminFeedbackModalComponent
    ]}));

  it('should have ctx', inject([ AdminFeedbackModalComponent ], (component: AdminFeedbackModalComponent) => {
    expect(true).toEqual(true);
  }));

});
