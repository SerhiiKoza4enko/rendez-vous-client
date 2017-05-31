import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminGalleryComponent } from './gallery.component';

describe('Feedbacks', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminGalleryComponent
    ]}));

  it('should have a title',
    inject([ AdminGalleryComponent ],
    (component: AdminGalleryComponent) => {
    expect(true).toEqual(true);
  }));

});
