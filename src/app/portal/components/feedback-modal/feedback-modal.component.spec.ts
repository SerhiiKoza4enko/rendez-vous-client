import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FeedbackModalComponent } from './feedback-modal.component';

describe('Feedback Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FeedbackModalComponent
    ]}));

  it('should have ctx', inject([ FeedbackModalComponent ], (component: FeedbackModalComponent) => {
    expect(true).toEqual(true);
  }));

});
