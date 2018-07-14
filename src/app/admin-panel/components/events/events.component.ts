import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as swal from 'sweetalert2';
import * as moment from 'moment';
import { Grid, GridOptions, GridApi } from 'ag-grid/main';

import { AdminEventModalComponent } from '../event-modal/event-modal.component';
import { EventService } from '../../../portal/services/event';

import { agGridLocalizationRussian } from '../../../core/global.constant';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'events'
  selector: 'events',  // <events></events>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    EventService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./events.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './events.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class AdminEventsComponent implements OnInit {
  public events: IEvent[];
  public columns: any[];
  public gridOptions: GridOptions;
  public page: number = 1;
  private params: any;

  constructor(
    private eventService: EventService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `Events` component');
    moment.locale('ru');
    this.gridOptions = <GridOptions> {};
    this.loadEvents();
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
    if (row.event.target !== undefined) {
      let event: IEvent = row.data;
      let target: string = row.event.target.tagName;
      if (target === 'BUTTON' || target === 'I') {
        let node = row.event.target;
        if (target === 'I') {
          node = node.parentElement;
        }
        switch (node.getAttribute('action')) {
          case 'edit':
            this.editEvent(event, row);
            break;
          case 'delete':
            this.removeEvent(event, row);
            break;
          default:
            break;
        }
      }
    }
  }

  public pageChanged(page: number, rowNode: any): void {
    this.gridOptions.api.paginationGoToPage(page - 1);
  }

  public addEvent(): void {
    let newEvent: IEvent = <IEvent> {};
    let result: Promise<IEvent> = this.openModal(newEvent);
    result.then((eventRes: IEvent) => {
      return this.eventService.save(eventRes)
        .$observable.
        subscribe((eventCreated: IEvent) => {
          this.events.push(eventCreated);
          this.gridOptions.api.setRowData(this.events);
          this.toastr.success('Запись успешно добавлена!');
        }, () => {
          this.toastr.error('Во время сохранения произошла ошибка.');
        });
    }, () => {
      return Observable.of(event);
    });
  }

  private editEvent(event: IEvent, row: any): void {
    let updateRows: any = [];
    let result: Promise<IEvent> = this.openModal(event);
    result.then((eventRes: IEvent) => {
      return this.eventService.update(eventRes)
        .$observable.
        subscribe((eventUpdated: IEvent) => {
          updateRows.push(row.node);
          row.node.setData(eventUpdated);
          this.gridOptions.api.refreshRows(updateRows);
          this.gridOptions.api.onSortChanged();
          this.toastr.success('Запись успешно обновлена!');
        }, () => {
          this.toastr.error('Во время сохранения произошла ошибка.');
        });
    }, () => {
      return Observable.of(event);
    });
  }

  private removeEvent(event: IEvent, row: any): void {
    (<any> swal)({
      title: 'Удалить?',
      // tslint:disable-next-line:max-line-length
      text: `Вы уверены, что хотите удалить эту запись? Вы не сможете восстановить её после удаления!`,
      type: 'warning',
      reverseButtons: true,
      focusCancel: true,
      showCancelButton: true,
      buttonsStyling: false,
      showCloseButton: true,
      confirmButtonClass: 'btn btn-danger margin-5 d5-init-ripples',
      confirmButtonText: 'Да, удалить запись!',
      cancelButtonClass: 'btn btn-default margin-5 d5-init-ripples',
      cancelButtonText: 'Нет!'
    })
      .then(() => {
        this.eventService.remove({ id: event.id })
          .$observable
          .subscribe(
          () => {
            (<any> swal)({
              title: 'Удалена!',
              text: 'Запись была успешно удалена.',
              type: 'success',
              confirmButtonClass: 'btn btn-primary d5-init-ripples',
              buttonsStyling: false,
              showCloseButton: true
            });
            let index: number = this.events.findIndex((e: IEvent) => e.id === event.id);
            if (index !== -1) {
              this.events.splice(index, 1);
              this.gridOptions.api.setRowData(this.events);
            }
          },
          () => {
            (<any> swal)({
              title: 'Ошибка...',
              text: 'Во время удаления произошла ошибка.',
              type: 'error',
              confirmButtonClass: 'btn btn-primary d5-init-ripples',
              buttonsStyling: false,
              showCloseButton: true
            });
          }
          );
      })
      .catch((<any> swal).noop);
  }

  private openModal(event: IEvent): Promise<IEvent> {
    const modalRef = this.modalService.open(
      AdminEventModalComponent,
      { backdrop: 'static', windowClass: 'full-width-popup' }
    );
    modalRef.componentInstance.event = Object.assign({}, event);
    return modalRef.result;
  }

  private loadEvents(): void {
    this.eventService.query()
      .$observable
      .subscribe((events: IEvent[]) => this.events = events);
  }

  private createColumns(): void {
    this.columns = [
      {
        headerName: 'Заголовок',
        field: 'subject',
        filter: 'text',
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: 'Дата',
        field: 'createdAt',
        filter: 'date',
        filterParams: { filterOptions: ['contains'] },
        cellRenderer: (params: any) => {
          return moment(params.data.updatedAt).format('D/MM/YYYYY LT');
        }
      },
      {
        headerName: '',
        suppressMenu: true,
        suppressSorting: true,
        width: 35,
        cellRenderer: (params: any) => {
          return `<button
                    class="btn btn-info btn-fab-mini"
                    ngbTooltip='Изменить'
                    container="body"
                    placement="top"
                    action="edit">
                    <i class="fa fa-pencil"></i>
                  </button><button
                    class="btn btn-danger btn-fab-mini"
                    ngbTooltip='Удалить'
                    container="body"
                    placement="top"
                    action="delete">
                    <i class="fa fa-trash"></i>
                  </button>`;
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
