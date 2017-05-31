import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { AdminUsersComponent } from './users.component';

describe('Users', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AdminUsersComponent
    ]}));

  it('should have a title', inject([ AdminUsersComponent ], (component: AdminUsersComponent) => {
    expect(true).toEqual(true);
  }));

});
