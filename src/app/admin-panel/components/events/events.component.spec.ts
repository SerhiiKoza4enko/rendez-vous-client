import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminEventsComponent } from './events.component';

describe('Events', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminEventsComponent
    ]}));

  it('should have a title',
    inject([ AdminEventsComponent ],
    (component: AdminEventsComponent) => {
    expect(true).toEqual(true);
  }));

});
