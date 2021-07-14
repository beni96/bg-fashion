import { Routes } from '@angular/router';
import { AdminViewComponent } from '../modules/admin-view/admin-view.component';
import { AdminPath } from './admin.routes.names';

export const ADMIN_ROUTES: Routes = [{ path: AdminPath.Home, component: AdminViewComponent }];
