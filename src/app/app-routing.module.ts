import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './modules/admin/admin.component';
import { BG_FASHION_ROUTES } from './modules/bg-fashion/router/bg-fashion.routes';
import { BG_FASHION_PREFIX } from './modules/bg-fashion/router/bg-fashion.routes.names';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

export const ADMIN_PREFIX = 'admin';

const routes: Routes = [
  { path: BG_FASHION_PREFIX, children: BG_FASHION_ROUTES },
  { path: ADMIN_PREFIX, component: AdminComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
