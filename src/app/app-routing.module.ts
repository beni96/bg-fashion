import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BG_FASHION_ROUTES } from './modules/bg-fashion/router/bg-fashion.routes';
import { BG_FASHION_PREFIX } from './modules/bg-fashion/router/bg-fashion.routes.names';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: BG_FASHION_PREFIX, children: BG_FASHION_ROUTES },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
