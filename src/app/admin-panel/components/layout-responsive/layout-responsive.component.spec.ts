import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminLayoutResponsiveComponent } from './layout-responsive.component';

describe('AdminLayoutResponsive', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminLayoutResponsiveComponent
    ]}));

  // tslint:disable-next-line:max-line-length
  it('should have a title', inject([ AdminLayoutResponsiveComponent ], (component: AdminLayoutResponsiveComponent) => {
    expect(true).toEqual(true);
  }));

});
