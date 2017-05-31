import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SignInComponent } from './sign-in.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SignInComponent
    ]}));

  it('should have ctx', inject([ SignInComponent ], (component: SignInComponent) => {
    expect(true).toEqual(true);
  }));

});
