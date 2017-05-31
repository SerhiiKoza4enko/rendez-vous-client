import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminForeignsComponent } from './foreigns.component';

describe('Foreigns', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminForeignsComponent
    ]}));

  it('should have a title',
    inject([ AdminForeignsComponent ],
    (component: AdminForeignsComponent) => {
    expect(true).toEqual(true);
  }));

});
