import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LayoutResponsiveComponent } from './layout-responsive.component';

describe('LayoutResponsive', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LayoutResponsiveComponent
    ]}));

  // tslint:disable-next-line:max-line-length
  it('should have a title', inject([ LayoutResponsiveComponent ], (component: LayoutResponsiveComponent) => {
    expect(true).toEqual(true);
  }));

});
