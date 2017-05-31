import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminPagesComponent } from './pages.component';

describe('Pages', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminPagesComponent
    ]
  }));

  it('should have a title',
    inject([AdminPagesComponent],
      (component: AdminPagesComponent) => {
        expect(true).toEqual(true);
      }));

});
