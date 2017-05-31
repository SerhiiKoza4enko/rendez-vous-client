import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { CalendarModule } from 'angular-calendar';

import { CoreModule } from '../core';

import { ROUTES } from './portal.routes';
import { LayoutComponent } from './components/layout';
import { SignInComponent } from './components/sign-in';
import { SignUpComponent } from './components/sign-up';
import { ProfileComponent } from './components/profile';
import { PasswordResetComponent } from './components/password-reset';
import { ContactsComponent } from './components/contacts';
import { FeedbacksComponent } from './components/feedbacks';
import { FeedbackModalComponent } from './components/feedback-modal';
import { EventsComponent } from './components/events';
import { BookingComponent } from './components/booking';
import { BookingModalComponent } from './components/booking-modal';
import { ForeignsComponent } from './components/foreigns';
import { ForeignModalComponent } from './components/foreign-modal';
import { ArticleViewComponent } from './components/article-view';
import { GalleryComponent } from './components/gallery';

import { FeedbackService } from './services/feedback';
import { ContactService } from './services/contact';
import { EventService } from './services/event';
import { PageService } from './services/page';
import { BookingService } from './services/booking';
import { ForeignService } from './services/foreign';
import { RoomService } from './services/room';
import { PhotoService } from './services/photo';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CoreModule,
    CalendarModule.forRoot()
  ],
  exports: [
    LayoutComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    PasswordResetComponent,
    ContactsComponent,
    FeedbacksComponent,
    FeedbackModalComponent,
    EventsComponent,
    BookingComponent,
    BookingModalComponent,
    ForeignsComponent,
    ForeignModalComponent,
    ArticleViewComponent,
    GalleryComponent
  ],
  declarations: [
    LayoutComponent,
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    PasswordResetComponent,
    ContactsComponent,
    FeedbacksComponent,
    FeedbackModalComponent,
    EventsComponent,
    BookingComponent,
    BookingModalComponent,
    ForeignsComponent,
    ForeignModalComponent,
    ArticleViewComponent,
    GalleryComponent
  ],
  providers: [
    FeedbackService,
    ContactService,
    EventService,
    PageService,
    BookingService,
    ForeignService,
    RoomService,
    PhotoService
  ],
  entryComponents: [
    SignInComponent,
    SignUpComponent,
    ProfileComponent,
    FeedbackModalComponent,
    ForeignModalComponent,
    BookingModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})

export class PortalModule {
  public static ROUTES = ROUTES;
}
