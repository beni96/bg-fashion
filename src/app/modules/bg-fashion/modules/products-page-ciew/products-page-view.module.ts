import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsPageViewComponent } from './products-page-view.component';

@NgModule({
  declarations: [ProductsPageViewComponent],
  imports: [BrowserModule, CommonModule],
})
export class ProductsPageViewModule {}
