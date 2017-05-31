import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SignUpComponent } from './sign-up.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SignUpComponent
    ]}));

  it('should have ctx', inject([ SignUpComponent ], (component: SignUpComponent) => {
    expect(true).toEqual(true);
  }));

});
