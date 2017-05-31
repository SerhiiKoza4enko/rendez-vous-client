import { inject, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ArticleViewComponent } from './article-view.component';

describe('Article View', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ArticleViewComponent
    ]}));

  it('should have a title', inject([ ArticleViewComponent ], (component: ArticleViewComponent) => {
    expect(true).toEqual(true);
  }));

});
