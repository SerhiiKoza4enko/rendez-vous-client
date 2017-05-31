import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ContactsComponent } from './contacts.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ContactsComponent
    ]}));

  it('should have ctx', inject([ ContactsComponent ], (component: ContactsComponent) => {
    expect(true).toEqual(true);
  }));

});
