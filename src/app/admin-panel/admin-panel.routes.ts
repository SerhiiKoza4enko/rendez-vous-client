import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './components/layout';
import { AuthAdminGuardService } from '../core/services/auth-admin-guard';

export const ROUTES: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [ AuthAdminGuardService ]
  }
];
