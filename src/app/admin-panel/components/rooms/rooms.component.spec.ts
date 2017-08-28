import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminRoomsComponent } from './rooms.component';

describe('Rooms', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminRoomsComponent
    ]}));

  it('should have a title',
    inject([ AdminRoomsComponent ],
    (component: AdminRoomsComponent) => {
    expect(true).toEqual(true);
  }));

});
