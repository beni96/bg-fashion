import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartDetails } from 'src/app/common/interfaces/cart-details';
import { CartProduct } from 'src/app/common/interfaces/cart-product';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { getTotalPrice } from '../../common/utils';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

export enum CartStep {
  PRODUCTS = 0,
  DETAILS = 1,
  SUMMARY = 2,
}

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.scss'],
})
export class CartViewComponent implements OnInit {
  currentStep: CartStep = CartStep.PRODUCTS;
  cartProducts: CartProduct[] = [];
  cartStep = CartStep;
  cartDetailsValues: CartDetails;

  @ViewChild('cartDetails') cartDetails: CartDetailsComponent;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartProducts = this.cartService.getCartProducts();
  }

  onCancelClick() {
    this.router.navigate([BgFashionPath.Home]);
  }

  onBackClick() {
    this.currentStep--;
  }

  onNextClick() {
    if (this.currentStep === CartStep.SUMMARY) {
      return this.submitOrder();
    }

    if (this.currentStep === CartStep.DETAILS) {
      if (!this.cartDetails.validateForm()) {
        return;
      }
      this.cartDetailsValues = this.cartDetails.getCartDetailsValues() as CartDetails;
    }

    this.currentStep++;
  }

  onCartProductClick(productId: number) {
    this.router.navigate([BgFashionPath.Product, productId]);
  }

  onTrashClicked(productId: number) {
    this.cartService.removeCartProduct(productId);
  }

  submitOrder() {}

  getTotalPrice(): number {
    return getTotalPrice(this.cartProducts);
  }

  getTotalItems(): number {
    let totalItems = 0;
    this.cartProducts.forEach((cartProduct) => {
      totalItems += cartProduct.quantity;
    });
    return totalItems;
  }
}
