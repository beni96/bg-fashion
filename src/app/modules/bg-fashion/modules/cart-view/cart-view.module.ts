import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { CartViewComponent } from './cart-view.component';
import { CartTemplateComponent } from './components/cart-template/cart-template.component';
import { CartProductsComponent } from './components/cart-products/cart-products.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CartViewComponent, CartTemplateComponent, CartProductsComponent, CartDetailsComponent, CartSummaryComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    CommonModule,
    CommonComponentsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class CartViewModule {}
