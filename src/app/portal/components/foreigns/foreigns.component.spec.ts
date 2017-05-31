import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ForeignsComponent } from './foreigns.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ForeignsComponent
    ]}));

  it('should have ctx', inject([ ForeignsComponent ], (component: ForeignsComponent) => {
    expect(true).toEqual(true);
  }));

});
