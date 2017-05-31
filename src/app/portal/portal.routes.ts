import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './components/layout';
import { ArticleViewComponent } from './components/article-view';
import { ViewMetaGuardService } from '../core/services/view-meta-guard';

export const ROUTES: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'view/:type/:id', component: ArticleViewComponent }
];
