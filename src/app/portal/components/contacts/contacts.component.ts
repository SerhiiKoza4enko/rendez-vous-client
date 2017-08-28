import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ContactService } from '../../services/contact';

@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'scontacts'
  selector: 'contacts',  // <contacts></contacts>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    ContactService
  ],
  // Our list of styles in our component. We may add more to compose many styles together
  styleUrls: ['./contacts.style.scss'],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  templateUrl: './contacts.template.pug'
})

export class ContactsComponent {
  public contacts: IContact[];
  public lat: number = 47.848571;
  public lng: number = 35.104203;

  constructor(
    private contactService: ContactService,
    private toastr: ToastsManager,
    private router: Router
  ) {
    console.log('hello `Contacts` component');
    this.loadContacts();
  }

  private loadContacts() {
    this.contactService.query()
      .$observable
      .subscribe((contacts: IContact[]) => this.contacts = contacts);
  }
}
