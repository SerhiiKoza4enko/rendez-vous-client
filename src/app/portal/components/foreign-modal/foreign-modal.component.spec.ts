import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ForeignModalComponent } from './foreign-modal.component';

describe('Foreign Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ForeignModalComponent
    ]}));

  it('should have ctx', inject([ ForeignModalComponent ], (component: ForeignModalComponent) => {
    expect(true).toEqual(true);
  }));

});
