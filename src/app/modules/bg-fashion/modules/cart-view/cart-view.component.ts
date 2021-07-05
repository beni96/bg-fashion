import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartProduct } from 'src/app/common/interfaces/cart-product';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';

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
    this.currentStep++;
  }

  onCartProductClick(productId: number) {
    this.router.navigate([BgFashionPath.Product, productId]);
  }

  onTrashClicked(productId: number) {
    this.cartService.removeCartProduct(productId);
  }

  submitOrder() {}
}
