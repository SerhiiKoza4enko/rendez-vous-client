import { Routes } from '@angular/router';
import { NoContentComponent } from './no-content';
import { LayoutComponent } from './portal/components/layout';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: LayoutComponent },
  { path: '**', component: NoContentComponent }
];
