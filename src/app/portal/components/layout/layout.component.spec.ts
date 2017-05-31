import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { LayoutComponent } from './layout.component';

describe('Layout', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      LayoutComponent
    ]}));

  it('should have a title', inject([ LayoutComponent ], (component: LayoutComponent) => {
    expect(true).toEqual(true);
  }));

});
