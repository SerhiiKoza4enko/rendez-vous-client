import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as swal from 'sweetalert2';
import { Grid, GridOptions, GridApi } from 'ag-grid/main';

import { AdminRoomModalComponent } from '../room-modal/room-modal.component';
import { RoomService } from '../../../portal/services/room';

import { agGridLocalizationRussian } from '../../../core/global.constant';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'rooms'
  selector: 'rooms',  // <rooms></rooms>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    RoomService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./rooms.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './rooms.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class AdminRoomsComponent implements OnInit {
  public rooms: IRoom[];
  public columns: any[];
  public gridOptions: GridOptions;
  public page: number = 1;
  private params: any;

  constructor(
    private roomService: RoomService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `Rooms` component');
    this.gridOptions = <GridOptions> {};
    this.loadRooms();
    this.createColumns();
    this.setGridOptions();
  }

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void { }

  public onGridReady(params: any): void {
    this.gridOptions.api = params.api;
    this.gridOptions.api.sizeColumnsToFit();
  }

  public pageChanged(page: number, rowNode: any): void {
    this.gridOptions.api.paginationGoToPage(page - 1);
  }

  public onRowClicked(row: any): void {
    if (row.event.target !== undefined) {
      let room: IRoom = row.data;
      let target: string = row.event.target.tagName;
      if (target === 'BUTTON' || target === 'I') {
        let node = row.event.target;
        if (target === 'I') {
          node = node.parentElement;
        }
        switch (node.getAttribute('action')) {
          case 'edit':
            this.editRoom(room, row);
            break;
          default:
            break;
        }
      }
    }
  }

  public addRoom(): void {
    let newRoom: IRoom = <IRoom> {};
    let result: Promise<IRoom> = this.openModal(newRoom);
    result.then((roomRes: IRoom) => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      return this.roomService.save(roomRes)
        .$observable.
        subscribe((roomCreated: IRoom) => {
          this.rooms.push(roomCreated);
          this.gridOptions.api.setRowData(this.rooms);
          this.toastr.success('Комната успешно добавлена!');
        }, () => {
          this.toastr.error('Во время сохранения произошла ошибка.');
        });
    }, () => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      return Observable.of(event);
    });
  }

  private loadRooms(): void {
    this.roomService.query()
      .$observable
      .subscribe((rooms: IRoom[]) => this.rooms = rooms.sort((a: IRoom, b: IRoom) => {
        return a.order > b.order ? 1 : a.order < b.order ? -1 : 0;
      }));
  }

  private editRoom(room: IRoom, row: any): void {
    let updateRows: any = [];
    let result: Promise<IRoom> = this.openModal(room);
    result.then((roomRes: IRoom) => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      return this.roomService.update(roomRes)
        .$observable.
        subscribe((roomUpdated: IRoom) => {
          updateRows.push(row.node);
          row.node.setData(roomUpdated);
          this.gridOptions.api.refreshRows(updateRows);
          this.gridOptions.api.onSortChanged();
          this.toastr.success('Комната успешно обновлена!');
        }, () => {
          this.toastr.error('Во время сохранения произошла ошибка.');
        });
    }, () => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      return Observable.of(event);
    });
  }

  private openModal(room: IRoom): Promise<IRoom> {
    $.fn.fullpage.setMouseWheelScrolling(false);
    const modalRef = this.modalService.open(AdminRoomModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.room = Object.assign({}, room);
    return modalRef.result;
  }

  private createColumns(): void {
    this.columns = [
      {
        headerName: 'Фото',
        field: 'image',
        width: 100,
        cellRenderer: (params: any) => {
          return '<img style="height: 100px;" src="' + params.value + '"/>';
        }
      },
      {
        headerName: 'Название',
        field: 'name',
        filter: 'text',
        width: 150,
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: 'Плошадь',
        field: 'square',
        filter: 'text',
        width: 100,
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: 'Человек',
        field: 'capacity',
        filter: 'text',
        width: 100,
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: 'Описание',
        field: 'description',
        filter: 'text',
        width: 400,
        filterParams: { filterOptions: ['contains'] },
        cellStyle: {
            'white-space': 'normal'
        },
        cellRenderer: (params: any) => {
          return (params.data.description || '').replace(/\n/g, '<br />');
        }
      },
      {
        headerName: '',
        field: 'active',
        width: 50,
        cellRenderer: (params: any) => {
          return params.data.active ? 'Активна' : 'Не активна';
        }
      },
      {
        headerName: '',
        suppressMenu: true,
        suppressSorting: true,
        width: 30,
        cellRenderer: (params: any) => {
          return `<button
                    class="btn btn-info btn-fab-mini"
                    ngbTooltip='Изменить'
                    container="body"
                    placement="top"
                    action="edit">
                    <i class="fa fa-pencil"></i>
                  </button>`;
        }
      }
    ];
  }

  private setGridOptions(): void {
    this.gridOptions = <GridOptions> {
      pagination: true,
      suppressPaginationPanel: true,
      paginationPageSize: 4,
      enableColResize: true,
      enableSorting: true,
      enableFilter: true,
      rowHeight: 100,
      columnDefs: this.columns,
      groupSuppressAutoColumn: true,
      localeText: agGridLocalizationRussian,
      animateRows: true
    };
  }
}
