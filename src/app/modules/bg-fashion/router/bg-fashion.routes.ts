import { Routes } from '@angular/router';
import { IsProductValidGuard } from 'src/app/guards/is-product-valid/is-product-valid.guard';
import { CartViewComponent } from '../modules/cart-view/cart-view.component';
import { FavoritesViewComponent } from '../modules/favorites-view/favorites-view.component';
import { HomePageViewComponent } from '../modules/home-page-view/home-page-view.component';
import { ProductViewComponent } from '../modules/product-view/product-view.component';
import { ProductsPageViewComponent } from '../modules/products-page-view/products-page-view.component';
import { BgFashionPath, PRODUCTS_PREFIX } from './bg-fashion.routes.names';

const PRODUCTS_ROUTES: Routes = [
  { path: `${BgFashionPath.Category}/:category`, component: ProductsPageViewComponent },
  { path: `${BgFashionPath.Category}/:category/${BgFashionPath.Subcategory}/:subcategory`, component: ProductsPageViewComponent },
  { path: `${BgFashionPath.Product}/:id`, component: ProductViewComponent },
  { path: `${BgFashionPath.Category}/:category/${BgFashionPath.Product}/:id`, component: ProductViewComponent },
  {
    path: `${BgFashionPath.Category}/:category/${BgFashionPath.Subcategory}/:subcategory/${BgFashionPath.Product}/:id`,
    component: ProductViewComponent,
  },
];

export const BG_FASHION_ROUTES: Routes = [
  { path: BgFashionPath.Home, component: HomePageViewComponent },
  { path: PRODUCTS_PREFIX, children: PRODUCTS_ROUTES, canActivateChild: [IsProductValidGuard] },
  { path: BgFashionPath.Favorites, component: FavoritesViewComponent },
  { path: BgFashionPath.Cart, component: CartViewComponent },
];
