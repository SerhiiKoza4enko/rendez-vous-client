import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as swal from 'sweetalert2';
import { Grid, GridOptions, GridApi } from 'ag-grid/main';

import { PhotoService } from '../../../portal/services/photo';
import { AdminPhotoModalComponent } from '../photo-modal/photo-modal.component';

import { agGridLocalizationRussian } from '../../../core/global.constant';
import { coreConfigConstant } from '../../../core/services/core-config';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'gallery'
  selector: 'gallery',  // <gallery></gallery>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    PhotoService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./gallery.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './gallery.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class AdminGalleryComponent {
  public photos: IPhoto[];
  public columns: any[];
  public gridOptions: GridOptions;
  public page: number = 1;
  private params: any;

  constructor(
    private photoService: PhotoService,
    private modalService: NgbModal,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `Gallery` component');
    this.gridOptions = <GridOptions> {};
    this.loadPhotos();
    this.createColumns();
    this.setGridOptions();
  }

  public onGridReady(params: any): void {
    this.gridOptions.api = params.api;
    this.gridOptions.api.sizeColumnsToFit();
  }

  public onRowClicked(row: any): void {
    if (row.event.target !== undefined) {
      let photo: IPhoto = row.data;
      let target: string = row.event.target.tagName;
      if (target === 'BUTTON' || target === 'I') {
        let node = row.event.target;
        if (target === 'I') {
          node = node.parentElement;
        }
        switch (node.getAttribute('action')) {
          case 'edit':
            this.editPhoto(photo, row);
            break;
          case 'delete':
            this.removePhoto(photo, row);
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

  public addPhoto(): void {
    let newPhoto: IPhoto = <IPhoto> {};
    let result: Promise<IPhoto> = this.openModal(newPhoto);
    result.then((photoRes: IPhoto) => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      return this.photoService.save(photoRes)
        .$observable.
        subscribe((photoCreated: IPhoto) => {
          this.photos.push(photoCreated);
          this.gridOptions.api.setRowData(this.photos);
          this.toastr.success('Запись успешно добавлена!');
        }, () => {
          this.toastr.error('Во время сохранения произошла ошибка.');
        });
    }, () => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      return Observable.of(event);
    });
  }

  private editPhoto(photo: IPhoto, row: any): void {
    let updateRows: any = [];
    let result: Promise<IPhoto> = this.openModal(photo);
    result.then((photoRes: IPhoto) => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      return this.photoService.update(photoRes)
        .$observable.
        subscribe((photoUpdated: IPhoto) => {
          updateRows.push(row.node);
          row.node.setData(photoUpdated);
          this.gridOptions.api.refreshRows(updateRows);
          this.gridOptions.api.onSortChanged();
          this.toastr.success('Фото успешно обновлено!');
        }, () => {
          this.toastr.error('Во время сохранения произошла ошибка.');
        });
    }, () => {
      $.fn.fullpage.setMouseWheelScrolling(true);
      return Observable.of(event);
    });
  }

  private removePhoto(photo: IPhoto, row: any): void {
    (<any> swal)({
      title: 'Удалить?',
      // tslint:disable-next-line:max-line-length
      text: `Вы уверены, что хотите удалить это фото? Вы не сможете восстановить его после удаления!`,
      type: 'warning',
      reverseButtons: true,
      focusCancel: true,
      showCancelButton: true,
      buttonsStyling: false,
      showCloseButton: true,
      confirmButtonClass: 'btn btn-danger margin-5 d5-init-ripples',
      confirmButtonText: 'Да, удалить фото!',
      cancelButtonClass: 'btn btn-default margin-5 d5-init-ripples',
      cancelButtonText: 'Нет!'
    })
      .then(() => {
        this.photoService.remove({ id: photo.id })
          .$observable
          .subscribe(
          () => {
            (<any> swal)({
              title: 'Удалено!',
              text: 'Фото было успешно удалено.',
              type: 'success',
              confirmButtonClass: 'btn btn-primary d5-init-ripples',
              buttonsStyling: false,
              showCloseButton: true
            });
            let index: number = this.photos.findIndex((e: IPhoto) => e.id === photo.id);
            if (index !== -1) {
              this.photos.splice(index, 1);
              this.gridOptions.api.setRowData(this.photos);
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

  private openModal(photo: IPhoto): Promise<IPhoto> {
    $.fn.fullpage.setMouseWheelScrolling(false);
    const modalRef = this.modalService.open(AdminPhotoModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.photo = Object.assign({}, photo);
    return modalRef.result;
  }

  private loadPhotos(): void {
    this.photoService.query()
      .$observable
      .subscribe((photos: IPhoto[]) => this.photos = photos);
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
        headerName: 'Описание',
        field: 'description',
        filter: 'text',
        filterParams: { filterOptions: ['contains'] }
      },
      {
        headerName: '',
        suppressMenu: true,
        suppressSorting: true,
        width: 28,
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
