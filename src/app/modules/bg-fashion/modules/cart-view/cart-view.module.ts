import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { CartViewComponent } from './cart-view.component';
import { CartTemplateComponent } from './components/cart-template/cart-template.component';
import { CartProductsComponent } from './components/cart-products/cart-products.component';

@NgModule({
  declarations: [CartViewComponent, CartTemplateComponent, CartProductsComponent],
  imports: [BrowserModule, RouterModule, CommonModule, CommonComponentsModule],
})
export class CartViewModule {}
