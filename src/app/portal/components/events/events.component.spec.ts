import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { EventsComponent } from './events.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EventsComponent
    ]}));

  it('should have ctx', inject([ EventsComponent ], (component: EventsComponent) => {
    expect(true).toEqual(true);
  }));

});
