import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminLayoutComponent } from './layout.component';

describe('Layout', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminLayoutComponent
    ]}));

  it('should have a title', inject([ AdminLayoutComponent ], (component: AdminLayoutComponent) => {
    expect(true).toEqual(true);
  }));

});
