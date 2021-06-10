import { Routes } from '@angular/router';
import { HomePageViewComponent } from '../modules/home-page-view/home-page-view.component';
import { BgFashionPath } from './bg-fashion.routes.names';

export const BG_FASHION_ROUTES: Routes = [{ path: BgFashionPath.Home, component: HomePageViewComponent }];
