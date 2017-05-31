import { Component, OnInit, Input, ViewEncapsulation, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  NgbActiveModal,
  NgbTimeStruct,
  NgbDateStruct,
  NgbDatepicker,
  NgbDatepickerI18n,
  NgbDatepickerConfig
} from '@ng-bootstrap/ng-bootstrap';
import * as jQuery from 'jquery';
import * as moment from 'moment';
import * as swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { BookingService } from '../../services/booking';

const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
  fr: {
    weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
    months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
  },
  ru: {
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    months: ['Янв', 'Фев', 'Мрт', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Нбр', 'Дек'],
  }
};

@Injectable()
export class I18n {
  public language: string = 'ru';
}

// tslint:disable-next-line:max-classes-per-file
@Injectable()
export class CustomDatepickerI18n extends NgbDatepickerI18n {

  constructor(private _i18n: I18n) {
    super();
  }

  public getWeekdayShortName(weekday: number): string {
    return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
  }
  public getMonthShortName(month: number): string {
    return I18N_VALUES[this._i18n.language].months[month - 1];
  }
  public getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }
}

// tslint:disable-next-line:max-classes-per-file
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'booking-modal'
  selector: 'booking-modal',  // <booking-modal></booking-modal>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    BookingService,
    NgbDatepickerConfig,
    I18n,
    {
      provide: NgbDatepickerI18n,
      useClass: CustomDatepickerI18n
    }
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./booking-modal.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './booking-modal.template.pug',
  encapsulation: ViewEncapsulation.None
})

export class BookingModalComponent implements OnInit {
  @Input() public booking: IBooking;
  @Input() public userId: string;
  @Input() public selected: Date;
  @Input() public minTime: NgbTimeStruct;
  @Input() public maxTime: NgbTimeStruct;
  @Input() public room: string;

  public timeRange: any;
  public dateRange: any;
  public periodEnd: NgbDateStruct;
  public selectedAsDateStruct: NgbDateStruct;

  public daysOfWeek: any = [
    { id: 1, name: 'Пн' },
    { id: 2, name: 'Вт' },
    { id: 3, name: 'Ср' },
    { id: 4, name: 'Чт' },
    { id: 5, name: 'Пт' },
    { id: 6, name: 'Сб' },
    { id: 7, name: 'Вс' }
  ];

  public startTimeControl = new FormControl('', (control: FormControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }
    if (this.getMinutesDiff(this.minTime, value) < 0) {
      return { minBusy: true };
    }
    return null;
  });

  public endTimeControl = new FormControl('', (control: FormControl) => {
    const value = control.value;
    if (!value) {
      return null;
    }
    if (this.getMinutesDiff(value, this.maxTime) < 0) {
      return { maxBusy: true };
    }
    return null;
  });

  constructor(
    private _i18n: I18n,
    public modalInstance: NgbActiveModal,
    private bookingService: BookingService,
    private datepickerConfig: NgbDatepickerConfig,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `booking-modal` component');
  }

  set language(language: string) {
    this._i18n.language = language;
  }

  get language() {
    return this._i18n.language;
  }

  public ngOnInit(): void {
    this.maxTime.hour++;
    if (this.booking && this.booking.id) {
      this.timeRange = {
        start: this.getTimeStruct(this.booking.start_time),
        end: this.getTimeStruct(this.booking.end_time)
      };
      this.dateRange = {
        start: this.getDateStruct(this.booking.period_start),
        end: this.getDateStruct(this.booking.period_end)
      };
    } else {
      this.booking = <IBooking> {};
      this.booking.start_time = this.selected;
      this.timeRange = {
        start: this.getTimeStruct(this.selected),
        end: this.getEndTime(this.selected)
      };
      this.dateRange = {
        start: this.getDateStruct(this.selected),
        end: <NgbDateStruct> {}
      };

      this.booking.days_of_week = [];
      this.booking.room = this.room;
      this.datepickerConfig.minDate = this.getDateStruct(this.selected);
    }
  }

  public addBooking(): void {
    this.booking.start_time = this.getDateFromTimeStruct(this.timeRange.start);
    this.booking.end_time = this.getDateFromTimeStruct(this.timeRange.end);
    if (this.booking.periodic) {
      this.booking.period_start = this.getDateFromDateStruct(this.dateRange.start);
      this.booking.period_end = this.getDateFromDateStruct(this.dateRange.end);
    }
    this.booking.period_id = this.generatePeriodId();
    this.bookingService.save(this.booking)
      .$observable
      .subscribe(
      (response: any) => {
        let bookings: IBooking[] = response.inserted;
        let text: string = 'Вы успешно забронировали комнату.';
        this.toastr.success(`Вы успешно забронировали комнату.`, '');
        if (response.busy && response.busy.length) {
          text += ` Однако обратите внимание, что `;
          text += response.busy
            .map((booking: IBooking) => moment(booking.start_time).format('DD.MM.YYYY'))
            .join(', ');
          text += ` эта комната уже занята в выбранное Вами время. 
                    Пожалуйста выберите другое время для этих дней и забронируйте отдельно.`;
        }
        (<any> swal)({
          title: 'Успешно!',
          text,
          type: response.busy && response.busy.length ? 'warning' : 'success',
          confirmButtonClass: 'btn btn-primary d5-init-ripples',
          buttonsStyling: false,
          showCloseButton: true
        });
        this.modalInstance.close(bookings.map((item: IBooking) => {
          item.start_time = moment(item.start_time).toDate();
          item.end_time = moment(item.end_time).toDate();
          item.days_of_week =
            item.days_of_week && item.days_of_week.length
              ? (<string> item.days_of_week).split(',')
                .map((day: string) => { return parseInt(day, 0); })
              : [];
          return item;
        }));
      },
      (error: any) => {
        let message: string = 'Что-то пошло не так...';
        if (error && error.message) {
          message = error.message;
        }
        this.toastr.error(message, 'Oops!');
      }
      );
  }

  public timeSpnaToString(time: NgbTimeStruct): string {
    return time.hour + ':' + (time.minute === 0 ? '00' : time.minute);
  }

  public toggleDaySelection(day: any) {
    let index = (<number[]> this.booking.days_of_week).indexOf(day.id);
    if (index > -1) {
      (<number[]> this.booking.days_of_week).splice(index, 1);
    } else {
      (<number[]> this.booking.days_of_week).push(day.id);
    }
  }

  private getEndTime(start: Date): NgbTimeStruct {
    let startTime: NgbTimeStruct = this.getTimeStruct(start);
    if (this.getMinutesDiff(startTime, this.maxTime) >= 60) {
      return <NgbTimeStruct> { hour: startTime.hour + 1, minute: startTime.minute };
    } else {
      return this.maxTime;
    }
  }

  private getMinutesDiff(startTime: NgbTimeStruct, endTime: NgbTimeStruct): number {
    return (endTime.hour - startTime.hour) * 60 +
      (endTime.minute - startTime.minute);
  }

  private getTimeStruct(date: Date): NgbTimeStruct {
    let m: moment.Moment = moment(date);
    return <NgbTimeStruct> {
      hour: m.hour(),
      minute: m.minute()
    };
  }

  private getDateStruct(date: Date): NgbDateStruct {
    let m: moment.Moment = moment(date);
    return <NgbDateStruct> {
      year: m.year(),
      month: m.month() + 1,
      day: m.date()
    };
  }

  private getDateFromTimeStruct(time: NgbTimeStruct): Date {
    let m = moment(this.selected);
    m.hour(time.hour);
    m.minute(time.minute);
    m.second(time.second);
    return m.toDate();
  }

  private getDateFromDateStruct(date: NgbDateStruct): Date {
    let m = moment();
    m.year(date.year);
    m.month(date.month - 1);
    m.date(date.day);
    m.hour(0);
    m.minute(0);
    m.second(0);
    m.toDate();
    return m.toDate();
  }

  private generatePeriodId(): string {
    return (this.booking.start_time.getHours() * 60
      + this.booking.start_time.getMinutes()).toString()
      + this.userId;
  }
}
