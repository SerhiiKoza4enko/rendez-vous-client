import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import * as swal from 'sweetalert2';
import { Grid, GridOptions, GridApi } from 'ag-grid/main';

import { AdminFeedbackModalComponent } from '../feedback-modal/feedback-modal.component';
import { FeedbackService } from '../../../portal/services/feedback';

import { agGridLocalizationRussian } from '../../../core/global.constant';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'feedbacks'
  selector: 'feedbacks',  // <feedbacks></feedbacks>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    FeedbackService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./feedbacks.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './feedbacks.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class AdminFeedbacksComponent implements OnInit {
  public feedbacks: IFeedback[];
  public columns: any[];
  public gridOptions: GridOptions;
  public page: number = 1;
  private params: any;

  constructor(
    private feedbackService: FeedbackService,
    private modalService: NgbModal,
    private router: Router
  ) {
    console.log('hello `Feedbacks` component');
    this.gridOptions = <GridOptions> {};
    this.loadFeedbacks();
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
      let feedback: IFeedback = row.data;
      let target: string = row.event.target.tagName;
      if (target === 'BUTTON' || target === 'I') {
        let result: Promise<IFeedback> = this.openModal(feedback);
        result.then((feedbackRes: IFeedback) => {
          return this.feedbackService.update(feedbackRes)
            .$observable.
            subscribe((feedbackUpdated: IFeedback) => {
              updateRows.push(row.node);
              row.node.setData(feedbackUpdated);
              this.gridOptions.api.refreshRows(updateRows);
              this.gridOptions.api.onSortChanged();
            });
        }, () => {
          return Observable.of(feedback);
        });
      }
    }
  }

  public pageChanged(page: number, rowNode: any): void {
    this.gridOptions.api.paginationGoToPage(page - 1);
  }

  private openModal(feedback: IFeedback): Promise<IFeedback> {
    const modalRef = this.modalService.open(AdminFeedbackModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.feedback = Object.assign({}, feedback);
    return modalRef.result;
  }

  private loadFeedbacks(): void {
    this.feedbackService.query()
      .$observable
      .subscribe((feedbacks: IFeedback[]) => this.feedbacks = feedbacks);
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
        headerName: 'Оценка',
        field: 'mark',
        filter: 'number',
        width: 150,
        cellRenderer: (params: any) => {
          return `<div class="rating">
                    <div class="stars">
                      <form action="">
                        <input
                          class="star star-5"
                          id="star-5"
                          type="radio"
                          name="star"
                          disabled
                          ` + (params.data.mark === '5' ? 'checked' : '') +
            `/>
                        <label class="star star-5" for="star-5"></label>
                        <input
                          class="star star-4"
                          id="star-4"
                          type="radio"
                          name="star"
                          disabled
                          ` + (params.data.mark === '4' ? 'checked' : '') +
            `/>
                        <label class="star star-4" for="star-4"></label>
                        <input
                          class="star star-3"
                          id="star-3"
                          type="radio"
                          name="star"
                          disabled
                          ` + (params.data.mark === '3' ? 'checked' : '') +
            `/>
                        <label class="star star-3" for="star-3"></label>
                        <input
                          class="star star-2"
                          id="star-2"
                          type="radio"
                          name="star"
                          disabled
                          ` + (params.data.mark === '2' ? 'checked' : '') +
            `/>
                        <label class="star star-2" for="star-2"></label>
                        <input
                          class="star star-1"
                          id="star-1"
                          type="radio"
                          name="star"
                          disabled
                          ` + (params.data.mark === '1' ? 'checked' : '') +
            `/>
                        <label class="star star-1" for="star-1"></label>
                      </form>
                    </div>
                  </div>`;
        },
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
