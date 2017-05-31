import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { PasswordResetComponent } from './password-reset.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PasswordResetComponent
    ]}));

  it('should have ctx', inject([ PasswordResetComponent ], (component: PasswordResetComponent) => {
    expect(true).toEqual(true);
  }));

});
