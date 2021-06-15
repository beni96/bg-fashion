import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductViewComponent } from './product-view.component';

@NgModule({
  declarations: [ProductViewComponent],
  imports: [BrowserModule, CommonModule],
})
export class ProductViewModule {}
