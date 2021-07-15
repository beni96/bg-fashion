import { Injectable } from '@angular/core';
import { CartProduct } from 'src/app/common/interfaces/cart-product';
import { ProductsService } from '../products-service/products.service';

const CART_PRODUCTS = 'cartProducts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: CartProduct[];

  constructor(private productsService: ProductsService) {
    this.getCartProducts();
  }

  getCartProducts(): CartProduct[] {
    if (this.cartProducts) {
      return this.cartProducts;
    }

    this.cartProducts = JSON.parse(localStorage.getItem(CART_PRODUCTS)) || [];
    this.cartProducts = this.cartProducts.filter((cartProduct) => !!this.productsService.getProductById(cartProduct.product.id));
    return this.cartProducts;
  }

  addCartProduct(cartProduct: CartProduct): void {
    const duplicatedCartProduct = this.cartProducts.find((existsCartProduct) => {
      return (
        existsCartProduct.product.id === cartProduct.product.id &&
        existsCartProduct.colorWithImages.color.hexCode === cartProduct.colorWithImages.color.hexCode &&
        existsCartProduct.size === cartProduct.size
      );
    });

    duplicatedCartProduct
      ? (duplicatedCartProduct.quantity += cartProduct.quantity)
      : (this.cartProducts = this.cartProducts.concat(cartProduct));
    localStorage.setItem(CART_PRODUCTS, JSON.stringify(this.cartProducts));
  }

  removeCartProduct(cartProductId: number): void {
    const cartProductIndex = this.cartProducts.findIndex((cartProduct) => cartProduct.product.id === cartProductId);
    this.cartProducts.splice(cartProductIndex, 1);
    localStorage.setItem(CART_PRODUCTS, JSON.stringify(this.cartProducts));
  }

  resetCart(): void {
    this.cartProducts = [];
    localStorage.setItem(CART_PRODUCTS, JSON.stringify(this.cartProducts));
  }

  clearCache(): void {
    this.cartProducts = null;
  }
}
