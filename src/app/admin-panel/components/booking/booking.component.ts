import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {
  CalendarEvent,
  CalendarMonthViewComponent,
  CalendarDayViewComponent,
  CalendarMonthViewDay,
  CalendarEventAction
} from 'angular-calendar';
import {
  NgbModal,
  NgbDateStruct,
  NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import * as swal from 'sweetalert2';
import * as jQuery from 'jquery';

import { LocalStorageService } from 'ng2-webstorage';

// tslint:disable-next-line:max-line-length
import { BookingModalComponent } from '../../../portal/components/booking-modal/booking-modal.component';
import { BookingService } from '../../../portal/services/booking';
import { RoomService } from '../../../portal/services/room';

interface BookingCalendarEvent extends CalendarEvent {
  booking: IBooking;
}

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'booking'
  selector: 'booking',  // <booking></booking>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    LocalStorageService,
    BookingService,
    RoomService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./booking.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './booking.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class AdminBookingComponent implements OnInit {
  public selectedRoom: IRoom;
  public rooms: IRoom[];
  public viewDate: Date = new Date();
  public events: CalendarEvent[];
  public dayEvents: CalendarEvent[];
  public bookings: IBooking[];
  public weekStartsOn: number = 1;
  public view: string = 'month';
  public startHours: number = 8;
  public endHours: number = 20;
  public dayModifier: Function;
  public color: any = { primary: 'blue', secondary: '' };

  public timeStruct: NgbTimeStruct;

  public user: IUser;
  public roomCols: number;

  public actions: CalendarEventAction[] = [{
    label: `<i class="fa fa-trash"></i>`,
    onClick: ({ event }: { event: CalendarEvent }): void => {
      this.removeClick(event);
    }
  }];

  constructor(
    private modalService: NgbModal,
    private roomService: RoomService,
    private bookingService: BookingService,
    private toastr: ToastsManager,
    private storage: LocalStorageService,
    private router: Router
  ) {
    console.log('hello `Booking` component');
    this.user = this.storage.retrieve('currentuser');
    this.selectedRoom = <IRoom> { id: '' };
    this.loadRooms();
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    /*this.dayModifier = (day: CalendarMonthViewDay) => {
      if (day.date < today) {
        day.cssClass = 'cal-disabled';
      }
    };*/
  }

  public ngOnInit(): void {
    this.loadBookings();
  }

  public loadBookings(): void {
    this.bookingService.query({
      year: this.viewDate.getFullYear(),
      month: this.viewDate.getMonth()
    })
      .$observable
      .subscribe((bookings: IBooking[]) => {
        this.bookings = bookings.map((item: IBooking) => {
          item.start_time = moment(item.start_time).toDate();
          item.end_time = moment(item.end_time).toDate();
          item.days_of_week =
            item.days_of_week && item.days_of_week.length
              ? (<string> item.days_of_week).split(',')
                .map((day: string) => { return parseInt(day, 0); })
              : [];
          return item;
        });
        this.fillEvents();
      });
  }

  public daySelect(day: Date): void {
    this.viewDate = day;
    this.view = 'room';
  }

  public timeSelect(event: any, booking?: IBooking): void {
    let date: Date = event.date;
    let todaysBookings = this.bookings.filter((b: IBooking) => {
      return moment(b.start_time).startOf('month').isSame(moment(date).startOf('month'));
    });
    let minTime: moment.Moment = moment(date).hour(this.startHours).minute(0).second(0);
    let maxTime: moment.Moment = moment(date).hour(this.endHours).minute(0).second(0);
    todaysBookings.forEach((b: IBooking) => {
      if (
        (moment(b.end_time).isBefore(moment(date)) || moment(b.end_time).isSame(moment(date)))
        && moment(b.end_time).isAfter(minTime)
        && (<IRoom> b.room).id === this.selectedRoom.id
        && (!booking || b.id !== booking.id)
      ) {
        minTime = moment(b.end_time);
      }
      if (
        (moment(b.start_time).isAfter(moment(date)) || moment(b.start_time).isSame(moment(date)))
        && moment(b.start_time).isBefore(maxTime)
        && (<IRoom> b.room).id === this.selectedRoom.id
        && (!booking || b.id !== booking.id)
      ) {
        maxTime = moment(b.start_time);
      }
    });
    this.open(booking, date, this.getTimeStruct(minTime), this.getTimeStruct(maxTime));
  }

  public eventClicked(event: any): void {
    let booking: IBooking = event.event.booking;
    this.timeSelect({ date: booking.start_time }, booking);
  }

  public selectRoom(room: IRoom): void {
    this.selectedRoom = room;
    this.fillDayEvents();
    this.view = 'day';
  }

  public removeClick(event: any): void {
    (<any> swal)({
      title: 'Отменить?',
      // tslint:disable-next-line:max-line-length
      text: `Вы уверены, что хотите отменить это событие? Вы не сможете восстановить его после удаления!`,
      type: 'warning',
      reverseButtons: true,
      focusCancel: true,
      showCancelButton: true,
      buttonsStyling: false,
      showCloseButton: true,
      confirmButtonClass: 'btn btn-danger margin-5 d5-init-ripples',
      confirmButtonText: 'Да, отменить событие!',
      cancelButtonClass: 'btn btn-default margin-5 d5-init-ripples',
      cancelButtonText: 'Нет!'
    })
      .then(() => {
        if (event.booking.periodic) {
          (<any> swal)({
            title: 'Удалить?',
            // tslint:disable-next-line:max-line-length
            text: `Вы хотите отменить одно событие или за весь период?`,
            type: 'warning',
            reverseButtons: true,
            focusCancel: true,
            showCancelButton: true,
            buttonsStyling: false,
            showCloseButton: true,
            confirmButtonClass: 'btn btn-danger margin-5 d5-init-ripples',
            confirmButtonText: 'Отменить все!',
            cancelButtonClass: 'btn btn-default margin-5 d5-init-ripples',
            cancelButtonText: 'Отменить одно!'
          })
            .then(() => {
              this.removeBooking(event.booking, true);
            }, () => {
              this.removeBooking(event.booking, false);
            })
            .catch((<any> swal).noop);
        } else {
          this.removeBooking(event.booking, false);
        }
      })
      .catch((<any> swal).noop);
  }

  public disableScroll(): void {
    $.fn.fullpage.setMouseWheelScrolling(false);
  }

  public enableScroll(): void {
    $.fn.fullpage.setMouseWheelScrolling(true);
  }

  private removeBooking(booking: IBooking, removeAll: boolean): void {
    this.bookingService.delete({ id: booking.id, all: removeAll })
      .$observable
      .subscribe(() => {
        this.toastr.success(`Вы успешно отменили события!`, '');
        this.loadBookings();
      },
      (error: any) => {
        let message: string = 'Что-то пошло не так...';
        if (error && error.message) {
          message = error.message;
        }
        this.toastr.error(message, 'Oops!');
      });
  }

  private loadRooms(): void {
    this.roomService.query()
      .$observable
      .subscribe((rooms: IRoom[]) => {
        this.rooms = rooms.filter((room: IRoom) => {
          return room.active === true;
        }).sort((a: IRoom, b: IRoom) => {
          return a.order > b.order ? 1 : a.order < b.order ? -1 : 0;
        }).map((room: IRoom) => {
          room.description = (room.description || '').replace(/\n/g, '<br />');
          return room;
        });
        this.roomCols = Math.ceil(12 / Math.ceil(this.rooms.length / 2));
        this.roomCols = this.roomCols === 12 && this.rooms.length > 1 ? 6 : this.roomCols;
      });
  }

  private open(booking?: IBooking, date?: Date, min?: NgbTimeStruct, max?: NgbTimeStruct) {
    const modalRef = this.modalService.open(BookingModalComponent);
    modalRef.componentInstance.booking = booking;
    modalRef.componentInstance.userId = this.user.id;
    modalRef.componentInstance.selected = date;
    modalRef.componentInstance.minTime = min;
    modalRef.componentInstance.maxTime = max;
    modalRef.componentInstance.room = this.selectedRoom;

    modalRef.result.then((bookings: IBooking[]) => {
      if (bookings && bookings.length) {
        this.bookings = this.bookings.concat(bookings);
        this.fillEvents();
      }
    }, () => null);
  }

  private getTimeStruct(date: moment.Moment): NgbTimeStruct {
    return <NgbTimeStruct> {
      hour: date.hour(),
      minute: date.minute()
    };
  }

  private fillEvents(): void {
    this.events = this.bookings.map((item: IBooking) => {
      let event: CalendarEvent = {
        start: item.start_time,
        end: item.end_time,
        title: item.user.lastname
          + ' '
          + item.user.firstname
          + ' '
          + (<IRoom> item.room).name
          + ' '
          + moment(item.start_time).format('HH:mm')
          + ' - '
          + moment(item.end_time).format('HH:mm')
          + ' '
          + item.title,
        color: {
          primary: this.hexToRgb((<IRoom> item.room).color, 1),
          secondary: this.hexToRgb((<IRoom> item.room).color, 0.5)
        }
      };
      return event;
    });
    this.fillDayEvents();
  }

  private fillDayEvents(): void {
    this.dayEvents = this.bookings
      .filter((item: IBooking) => {
        return (<IRoom> item.room).id === this.selectedRoom.id;
      })
      .map((item: IBooking) => {
        let event: BookingCalendarEvent = {
          booking: item,
          start: item.start_time,
          end: item.end_time,
          title: (item.user.id === this.user.id ? 'Я' :
              item.user.lastname
              + ' '
              + item.user.firstname
              + ' ('
              + item.user.phone
              + ')')
            + (item.title && item.title.length ? ' - ' + item.title : ''),
          color: {
            primary: this.hexToRgb((<IRoom> item.room).color, 1),
            secondary: this.hexToRgb((<IRoom> item.room).color, 0.5)
          },
          actions: this.actions
        };
        return event;
      });
  }

  private hexToRgb(hex: string, opacity: number): string {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ?
      'rgba('
      + parseInt(result[1], 16)
      + ','
      + parseInt(result[2], 16)
      + ','
      + parseInt(result[3], 16)
      + ','
      + opacity.toString()
      + ')'
      : null;
  }
}
