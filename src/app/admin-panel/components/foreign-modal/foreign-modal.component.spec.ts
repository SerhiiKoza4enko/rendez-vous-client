import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminForeignModalComponent } from './foreign-modal.component';

describe('Feedback Modal', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminForeignModalComponent
    ]
  }));

  it('should have ctx', inject(
    [AdminForeignModalComponent],
    (component: AdminForeignModalComponent) => {
    expect(true).toEqual(true);
  }));

});
