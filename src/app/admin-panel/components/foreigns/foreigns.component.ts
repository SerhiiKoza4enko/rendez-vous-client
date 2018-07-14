import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import * as swal from 'sweetalert2';
import { Grid, GridOptions, GridApi } from 'ag-grid/main';

import { AdminForeignModalComponent } from '../foreign-modal/foreign-modal.component';
import { ForeignService } from '../../../portal/services/foreign';

import { agGridLocalizationRussian } from '../../../core/global.constant';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'foreigns'
  selector: 'foreigns',  // <foreigns></foreigns>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    ForeignService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./foreigns.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './foreigns.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class AdminForeignsComponent implements OnInit {
  public foreigns: IForeign[];
  public columns: any[];
  public gridOptions: GridOptions;
  public page: number = 1;
  private params: any;

  constructor(
    private foreignService: ForeignService,
    private modalService: NgbModal,
    private router: Router
  ) {
    console.log('hello `Foreigns` component');
    this.gridOptions = <GridOptions> {};
    this.loadForeigns();
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
      let foreign: IForeign = row.data;
      let target: string = row.event.target.tagName;
      if (target === 'BUTTON' || target === 'I') {
        let result: Promise<IForeign> = this.openModal(foreign);
        result.then((foreignRes: IForeign) => {
          return this.foreignService.update(foreignRes)
            .$observable.
            subscribe((foreignUpdated: IForeign) => {
              updateRows.push(row.node);
              row.node.setData(foreignUpdated);
              this.gridOptions.api.refreshRows(updateRows);
              this.gridOptions.api.onSortChanged();
            });
        }, () => {
          return Observable.of(foreign);
        });
      }
    }
  }

  public pageChanged(page: number, rowNode: any): void {
    this.gridOptions.api.paginationGoToPage(page - 1);
  }

  private loadForeigns(): void {
    this.foreignService.query()
      .$observable
      .subscribe((foreigns: IForeign[]) => this.foreigns = foreigns);
  }

  private openModal(foreign: IForeign): Promise<IForeign> {
    const modalRef = this.modalService.open(AdminForeignModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.foreign = Object.assign({}, foreign);
    return modalRef.result;
  }

  private createColumns(): void {
    this.columns = [
      {
        headerName: '',
        suppressMenu: true,
        width: 24,
        field: 'checked',
        sort: 'asc',
        cellRenderer: (params: any) => {
          return !params.data.checked ? `<button
                    class="btn btn-info btn-fab-mini"
                    ngbTooltip='Просмотр'
                    container="body"
                    placement="top">
                    <i class="fa fa-exclamation"></i>
                  </button>` : '';
        },
        cellClass: (params: any) => {
          return !params.data.checked ? 'not-checked' : '';
        }
      },
      {
        headerName: 'Фамилия',
        field: 'user.lastname',
        filter: 'text',
        filterParams: { filterOptions: ['contains'] },
        cellClass: (params: any) => {
          return !params.data.checked ? 'not-checked' : '';
        }
      },
      {
        headerName: 'Имя',
        field: 'user.firstname',
        filter: 'text',
        filterParams: { filterOptions: ['contains'] },
        cellClass: (params: any) => {
          return !params.data.checked ? 'not-checked' : '';
        }
      },
      {
        headerName: 'Статус',
        field: 'active',
        suppressMenu: true,
        cellRenderer: (params: any) => {
          return params.data.active === true ? 'Доступный' : 'Недоступный';
        },
        cellClass: (params: any) => {
          return !params.data.checked ? 'not-checked' : '';
        }
      },
      {
        headerName: '',
        suppressMenu: true,
        suppressSorting: true,
        width: 28,
        cellRenderer: (params: any) => {
          return `<button
                    class="btn btn-info btn-fab-mini"
                    ngbTooltip='Просмотр'
                    container="body"
                    placement="top">
                    <i class="fa fa-eye"></i>
                  </button>`;
        },
        cellClass: (params: any) => {
          return !params.data.checked ? 'not-checked' : '';
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
      localeText: agGridLocalizationRussian,
      animateRows: true
    };
  }
}
