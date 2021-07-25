import { Routes } from '@angular/router';
import { Param } from 'src/app/common/url-params/params';
import { IsProductValidGuard } from 'src/app/guards/is-product-valid/is-product-valid.guard';
import { CartViewComponent } from '../modules/cart-view/cart-view.component';
import { FavoritesViewComponent } from '../modules/favorites-view/favorites-view.component';
import { HomePageViewComponent } from '../modules/home-page-view/home-page-view.component';
import { ProductViewComponent } from '../modules/product-view/product-view.component';
import { ProductsPageViewComponent } from '../modules/products-page-view/products-page-view.component';
import { BgFashionPath, PRODUCTS_PREFIX } from './bg-fashion.routes.names';

const PRODUCTS_ROUTES: Routes = [
  { path: `${BgFashionPath.Category}/:${Param.CATEGORY}`, component: ProductsPageViewComponent },
  {
    path: `${BgFashionPath.Category}/:${Param.CATEGORY}/${BgFashionPath.Subcategory}/:${Param.SUBCATEGORY}`,
    component: ProductsPageViewComponent,
  },
  { path: `${BgFashionPath.Product}/:${Param.PRODUCT_ID}`, component: ProductViewComponent },
  { path: `${BgFashionPath.Category}/:${Param.CATEGORY}/${BgFashionPath.Product}/:${Param.PRODUCT_ID}`, component: ProductViewComponent },
  {
    path: `${BgFashionPath.Category}/:${Param.CATEGORY}/${BgFashionPath.Subcategory}/:${Param.SUBCATEGORY}/${BgFashionPath.Product}/:${Param.PRODUCT_ID}`,
    component: ProductViewComponent,
  },
];

export const BG_FASHION_ROUTES: Routes = [
  { path: BgFashionPath.Home, component: HomePageViewComponent },
  { path: PRODUCTS_PREFIX, children: PRODUCTS_ROUTES, canActivateChild: [IsProductValidGuard] },
  { path: BgFashionPath.Favorites, component: FavoritesViewComponent },
  { path: BgFashionPath.Cart, component: CartViewComponent },
];
