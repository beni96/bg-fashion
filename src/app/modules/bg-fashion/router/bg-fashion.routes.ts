import { Routes } from '@angular/router';
import { IsExistProductGuard } from 'src/app/guards/is-exist-product/is-exist-product.guard';
import { CATEGORY_AND_SUBCATEGORY_TYPES } from '../common/types';
import { HomePageViewComponent } from '../modules/home-page-view/home-page-view.component';
import { ProductViewComponent } from '../modules/product-view/product-view.component';
import { ProductsPageViewComponent } from '../modules/products-page-ciew/products-page-view.component';
import { BgFashionPath } from './bg-fashion.routes.names';

let PRODUCTS_ROUTES: Routes = [];

CATEGORY_AND_SUBCATEGORY_TYPES.forEach((categoryAndSubcategory) => {
  categoryAndSubcategory.subcategory.forEach((subcategory) => {
    PRODUCTS_ROUTES = PRODUCTS_ROUTES.concat([
      { path: `${categoryAndSubcategory.category}/${subcategory}`, component: ProductsPageViewComponent },
      {
        path: `${categoryAndSubcategory.category}/${subcategory}/${BgFashionPath.Product}/:id`,
        component: ProductViewComponent,
        canActivate: [IsExistProductGuard],
      },
    ]);
  });

  PRODUCTS_ROUTES = PRODUCTS_ROUTES.concat([
    { path: categoryAndSubcategory.category, component: ProductsPageViewComponent },
    {
      path: `${categoryAndSubcategory.category}/${BgFashionPath.Product}/:id`,
      component: ProductViewComponent,
      canActivate: [IsExistProductGuard],
    },
  ]);
});

PRODUCTS_ROUTES = [
  { path: BgFashionPath.Home, component: HomePageViewComponent },
  ...PRODUCTS_ROUTES,
  { path: `${BgFashionPath.Product}/:id`, component: ProductViewComponent, canActivate: [IsExistProductGuard] },
];

export const BG_FASHION_ROUTES: Routes = [{ path: BgFashionPath.Home, children: PRODUCTS_ROUTES }];
