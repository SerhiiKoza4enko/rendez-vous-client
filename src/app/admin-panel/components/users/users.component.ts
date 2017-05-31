import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import * as swal from 'sweetalert2';
import { GridOptions, GridApi } from 'ag-grid/main';
import { UserService } from '../../../core/services/user';

import { agGridLocalizationRussian } from '../../../core/global.constant';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'users'
  selector: 'users',  // <users></users>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    UserService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./users.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './users.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class AdminUsersComponent implements OnInit {
  public users: IUser[];
  public columns: any[];
  public gridOptions: GridOptions;
  public page: number = 1;
  private params: any;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    console.log('hello `Users` component');
    this.gridOptions = <GridOptions> {};
    this.loadUsers();
    this.createColumns();
    this.setGridOptions();
  }

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void { }

  public onGridReady(params: any): void {
    this.gridOptions.api = params.api;
    this.gridOptions.api.sizeColumnsToFit();
  }

  public onRowClicked(row: any): void {
    let updateRows: any = [];
    if (row.event.target !== undefined) {
      let user: IUser = row.data;
      let target: string = row.event.target.tagName;
      if (target === 'BUTTON' || target === 'I') {
        let textVal: string =
          'Вы уверены, что хотите ' +
          (user.banned ? 'разблоикровать' : 'заблокировать') + ' этого пользователя?';
        let titleVal: string = user.banned ? 'Разблокировать?' : 'Заблокировать?';
        (<any> swal)({
          title: titleVal,
          // tslint:disable-next-line:max-line-length
          text: textVal,
          type: 'warning',
          reverseButtons: true,
          focusCancel: true,
          showCancelButton: true,
          buttonsStyling: false,
          showCloseButton: true,
          confirmButtonClass: 'btn btn-danger margin-5 d5-init-ripples',
          confirmButtonText: 'Да!',
          cancelButtonClass: 'btn btn-default margin-5 d5-init-ripples',
          cancelButtonText: 'Нет!'
        })
          .then(() => {
            updateRows.push(row.node);
            this.updateUser(user)
              .subscribe((resUser: IUser) => {
                textVal =
                  'Пользователь был успешно ' +
                  (resUser.banned ? 'заблокирован' : 'разблокирован');
                titleVal = resUser.banned ? 'Заблокирован!' : 'Разблокирован!';
                (<any> swal)({
                  title: titleVal,
                  text: textVal,
                  type: 'success',
                  confirmButtonClass: 'btn btn-primary d5-init-ripples',
                  buttonsStyling: false,
                  showCloseButton: true
                });
                row.node.setData(resUser);
                this.gridOptions.api.refreshRows(updateRows);
              }, () => {
                (<any> swal)({
                  title: 'Ошибка...',
                  text: 'Что-то пошло не так.',
                  type: 'error',
                  confirmButtonClass: 'btn btn-primary d5-init-ripples',
                  buttonsStyling: false,
                  showCloseButton: true
                });
              });
          })
          .catch((<any> swal).noop);
      }
    }
  }

  public pageChanged(page: number): void {
    this.gridOptions.api.paginationGoToPage(page - 1);
  }

  private loadUsers(): void {
    this.userService.query()
      .$observable
      .subscribe((users: IUser[]) => this.users = users);
  }

  private updateUser(user: IUser): Observable<IUser> {
    let u = Object.assign({}, user);
    u.banned = !u.banned;
    return this.userService.update(u).$observable;
  }

  private createColumns(): void {
    this.columns = [
      {
        suppressMenu: true,
        suppressSorting: true,
        headerName: '',
        width: 40,
        cellRenderer: (params: any) => {
          return '<div class="img img-avatar rounded-circle" style="background-image: url('
              + params.data.picture
              + ')"></div>';
        }
      },
      {
        headerName: 'Фамилия',
        field: 'lastname',
        filter: 'text',
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: 'Имя',
        field: 'firstname',
        filter: 'text',
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: 'Email',
        field: 'email',
        filter: 'text',
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: 'Телефон',
        field: 'phone',
        filter: 'text',
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: '',
        suppressMenu: true,
        suppressSorting: true,
        width: 40,
        cellRenderer: (params: any) => {
          if (params.data.banned) {
            return `<button 
                    class="btn btn-danger btn-fab-mini"
                    ngbTooltip='Разблокировать пользователя'
                    container="body"
                    placement="top">
                    <i class="fa fa-ban"></i>
                  </button>`;
          } else {
            return `<button 
                    class="btn btn-success btn-fab-mini"
                    ngbTooltip='Заблокировать пользователя'
                    container="body"
                    placement="top">
                    <i class="fa fa-check"></i>
                  </button>`;
          }
        }
      }
    ];
  }

  private setGridOptions(): void {
    this.gridOptions = <GridOptions> {
      pagination: true,
      suppressPaginationPanel: true,
      paginationPageSize: 10,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      rowHeight: 40,
      columnDefs: this.columns,
      groupSuppressAutoColumn: true,
      localeText: agGridLocalizationRussian
    };
  }
}
