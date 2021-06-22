import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsPageViewComponent } from './products-page-view.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [ProductsPageViewComponent, ProductComponent],
  imports: [BrowserModule, CommonModule],
})
export class ProductsPageViewModule {}
