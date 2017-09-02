import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout';
import { LayoutResponsiveComponent } from './components/layout-responsive';
import { ArticleViewComponent } from './components/article-view';
import { ViewMetaGuardService } from '../core/services/view-meta-guard';

export const ROUTES: Routes = [
  { path: '', component: LayoutResponsiveComponent },
  { path: 'view/:type/:id', component: ArticleViewComponent }
];
