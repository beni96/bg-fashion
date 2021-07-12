import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CartDetails } from 'src/app/common/interfaces/cart-details';
import { CartProduct } from 'src/app/common/interfaces/cart-product';
import { SendEmailRequest, SendEmailResponse } from 'src/app/common/interfaces/send-email';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { getTotalPrice } from '../../common/utils';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';

export enum CartStep {
  PRODUCTS = 0,
  DETAILS = 1,
  SUMMARY = 2,
  CONFIRMATION = 3,
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
  snackbarLabelSubject$ = new Subject<string>();

  @ViewChild('cartDetails') cartDetails: CartDetailsComponent;

  constructor(private api: ApiService, private router: Router, private cartService: CartService) {}

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

  submitOrder() {
    const body: SendEmailRequest = {
      _subject: `New Order - ${this.cartDetailsValues.name}`,
      name: this.cartDetailsValues.name,
      email: this.cartDetailsValues.email,
      message: this.getEmailMessage(),
    };
    this.api.sendOrderEmail(body).subscribe(
      (response: SendEmailResponse) => {
        if (!response.ok) {
          return this.snackbarLabelSubject$.next('Oops something went wrong');
        }
        this.cartService.resetCart();
        this.currentStep = CartStep.CONFIRMATION;
      },
      () => this.snackbarLabelSubject$.next('Oops something went wrong')
    );
  }

  onCartProductClick(productId: number) {
    this.router.navigate([BgFashionPath.Product, productId]);
  }

  onTrashClicked(productId: number) {
    this.cartService.removeCartProduct(productId);
  }

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

  private getEmailMessage(): string {
    // tslint:disable-next-line:max-line-length
    let message = `User Details:\nPhone: ${this.cartDetailsValues.phone}\nAddress: ${this.cartDetailsValues.address}\nNotes: ${this.cartDetailsValues.notes}\n\nProducts:\n`;

    this.cartProducts.forEach((cartProduct, index) => {
      // tslint:disable-next-line:max-line-length
      message += `${index + 1}. Product id: ${cartProduct.product.id}\nColor: ${cartProduct.colorWithImages.color.name}\nSize: ${
        cartProduct.size
      }\nQuantity: ${cartProduct.quantity}\n\n`;
    });
    return message;
  }
}
