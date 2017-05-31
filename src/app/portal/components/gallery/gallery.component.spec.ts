import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { GalleryComponent } from './gallery.component';

describe('Get Started', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      GalleryComponent
    ]}));

  it('should have ctx', inject([ GalleryComponent ], (component: GalleryComponent) => {
    expect(true).toEqual(true);
  }));

});
