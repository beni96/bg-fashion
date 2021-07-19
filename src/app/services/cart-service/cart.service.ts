import { Injectable } from '@angular/core';
import { CartProduct, CartProductExtended } from 'src/app/common/interfaces/cart-product';
import { ProductsService } from '../products-service/products.service';

const CART_PRODUCTS = 'cartProducts';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartProducts: CartProduct[];
  private extendedCartProducts: CartProductExtended[];

  constructor(private productsService: ProductsService) {
    this.getCartProducts();
  }

  private getCartProducts(): CartProduct[] {
    if (this.cartProducts) {
      return this.cartProducts;
    }

    this.cartProducts = JSON.parse(localStorage.getItem(CART_PRODUCTS)) || [];
    return this.cartProducts;
  }

  getExtendedCartProducts(): CartProductExtended[] {
    if (this.extendedCartProducts) {
      return this.extendedCartProducts;
    }

    this.extendedCartProducts = this.getCartProducts().map((cartProduct) => {
      const product = this.productsService.getProductById(cartProduct.productId);
      const colorWithImages = product?.colorsWithImages?.find((color) => color.color.name === cartProduct.colorName);
      const isSizeExist = cartProduct.size ? (product?.sizes as any[])?.find((size) => size === cartProduct.size) : true;
      if (!product || !colorWithImages || !isSizeExist) {
        return null;
      }
      return { product, colorWithImages, size: cartProduct.size, quantity: cartProduct.quantity };
    });
    this.extendedCartProducts = this.extendedCartProducts.filter((cartProduct) => !!cartProduct);
    return this.extendedCartProducts;
  }

  addCartProduct(cartProduct: CartProduct): void {
    const duplicatedCartProduct = this.getCartProducts().find((existsCartProduct) => {
      return (
        existsCartProduct.productId === cartProduct.productId &&
        existsCartProduct.colorName === cartProduct.colorName &&
        existsCartProduct.size === cartProduct.size
      );
    });

    duplicatedCartProduct
      ? (duplicatedCartProduct.quantity += cartProduct.quantity)
      : (this.cartProducts = this.cartProducts.concat(cartProduct));
    localStorage.setItem(CART_PRODUCTS, JSON.stringify(this.cartProducts));
    this.clearExtendedInfoCache();
  }

  removeCartProduct(cartProductId: number): void {
    const cartProductIndex = this.getCartProducts().findIndex((cartProduct) => cartProduct.productId === cartProductId);
    this.cartProducts.splice(cartProductIndex, 1);
    localStorage.setItem(CART_PRODUCTS, JSON.stringify(this.cartProducts));
    this.clearExtendedInfoCache();
  }

  resetCart(): void {
    this.cartProducts = [];
    this.extendedCartProducts = [];
    localStorage.setItem(CART_PRODUCTS, JSON.stringify(this.cartProducts));
  }

  clearCache(): void {
    this.cartProducts = null;
    this.extendedCartProducts = null;
  }

  clearExtendedInfoCache() {
    this.extendedCartProducts = null;
  }
}
