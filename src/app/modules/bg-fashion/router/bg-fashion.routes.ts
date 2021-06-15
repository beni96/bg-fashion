import { Routes } from '@angular/router';
import { HomePageViewComponent } from '../modules/home-page-view/home-page-view.component';
import { ProductViewComponent } from '../modules/product-view/product-view.component';
import { ProductsPageViewComponent } from '../modules/products-page-ciew/products-page-view.component';
import { BgFashionPath } from './bg-fashion.routes.names';

export const BG_FASHION_ROUTES: Routes = [
  { path: BgFashionPath.Home, component: HomePageViewComponent },

  { path: BgFashionPath.Products, component: ProductsPageViewComponent },
  { path: `${BgFashionPath.Products}/:category`, component: ProductsPageViewComponent },
  { path: `${BgFashionPath.Products}/:category/:subcategory`, component: ProductsPageViewComponent },

  { path: `${BgFashionPath.Product}/:id`, component: ProductViewComponent },
  { path: `${BgFashionPath.Product}/:category/:id`, component: ProductViewComponent },
  { path: `${BgFashionPath.Product}/:category/:subcategory/:id`, component: ProductViewComponent },
];
