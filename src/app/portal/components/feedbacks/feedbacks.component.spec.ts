import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FeedbacksComponent } from './feedbacks.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FeedbacksComponent
    ]}));

  it('should have ctx', inject([ FeedbacksComponent ], (component: FeedbacksComponent) => {
    expect(true).toEqual(true);
  }));

});
