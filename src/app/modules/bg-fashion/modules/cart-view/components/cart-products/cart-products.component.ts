import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct } from 'src/app/common/interfaces/cart-product';
import { getTotalPrice } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.scss'],
})
export class CartProductsComponent {
  @Input() cartProducts: CartProduct[] = [];

  @Output() productClicked = new EventEmitter<number>();
  @Output() trashClicked = new EventEmitter<number>();

  onCartProductClick(productId) {
    this.productClicked.emit(productId);
  }

  onTrashClick(productId: number) {
    this.trashClicked.emit(productId);
  }

  getTotalPrice(): number {
    return getTotalPrice(this.cartProducts);
  }
}
