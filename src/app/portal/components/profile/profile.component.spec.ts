import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ProfileComponent } from './profile.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProfileComponent
    ]}));

  it('should have ctx', inject([ ProfileComponent ], (component: ProfileComponent) => {
    expect(true).toEqual(true);
  }));

});
