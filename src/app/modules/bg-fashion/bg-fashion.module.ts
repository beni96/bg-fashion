import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomePageViewModule } from './modules/home-page-view/home-page-view.module';
import { ProductsPageViewModule } from './modules/products-page-view/products-page-view.module';
import { ProductViewModule } from './modules/product-view/product-view.module';
import { FavoritesViewModule } from './modules/favorites-view/favorites-view.module';

@NgModule({
  declarations: [],
  imports: [BrowserModule, HomePageViewModule, ProductsPageViewModule, ProductViewModule, FavoritesViewModule],
})
export class BgFashionModule {}
