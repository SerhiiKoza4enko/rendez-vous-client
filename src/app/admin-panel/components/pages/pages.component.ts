import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { TinymceModule } from 'angular2-tinymce';

import { PageService } from '../../../portal/services/page';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'pages'
  selector: 'pages',  // <pages></pages>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    PageService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./pages.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './pages.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class AdminPagesComponent {
  public page: IPage = <IPage> {};
  public data: string;
  public editor: any;

  constructor(
    private toastr: ToastsManager,
    private pageService: PageService,
    private router: Router
  ) {
    console.log('hello `Pages` component');
    this.loadPages();
  }

  public saveChanges(): void {
    if (this.page && this.page.id) {
      this.pageService.update(this.page)
        .$observable
        .subscribe((pageRes: IPage) => {
          this.page = pageRes;
          this.toastr.success(`Изменения успешно сохранены`, '');
        }, () => {
          this.toastr.error(`Что-то пошло не так...`, '');
        });
    } else {
      this.pageService.create(this.page)
        .$observable
        .subscribe((pageRes: IPage) => {
          this.page = pageRes;
          this.toastr.success(`Изменения успешно сохранены`, '');
        }, () => {
          this.toastr.error(`Что-то пошло не так...`, '');
        });
    }
  }

  private loadPages(): void {
    this.pageService.query()
      .$observable
      .subscribe((pages: IPage[]) => {
        if (pages.length) {
          this.page = pages[0];
        } else {
          this.page = <IPage> {
            about: ''
          };
        }
      });
  }
}
