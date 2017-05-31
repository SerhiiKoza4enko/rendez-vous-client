import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from 'ng2-webstorage';

@Injectable()
export class AuthAdminGuardService implements CanActivate {
  constructor(private router: Router, private storage: LocalStorageService) { }

  public canActivate() {
    let currentUser: IUser = this.storage.retrieve('currentUser');
    if (currentUser && currentUser.id && currentUser.role === 'admin') {
      return true;
    }
    this.router.navigate(['/']);
    return false;
  }
}
