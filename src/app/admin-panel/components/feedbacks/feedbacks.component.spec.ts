import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminFeedbacksComponent } from './feedbacks.component';

describe('Feedbacks', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminFeedbacksComponent
    ]}));

  it('should have a title',
    inject([ AdminFeedbacksComponent ],
    (component: AdminFeedbacksComponent) => {
    expect(true).toEqual(true);
  }));

});
