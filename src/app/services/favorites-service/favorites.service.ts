import { Injectable } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product';

const FAVORITE_PRODUCTS = 'favoriteProducts';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteProducts: Product[];

  constructor() {
    this.getFavoriteProducts();
  }

  getFavoriteProducts(): Product[] {
    if (this.favoriteProducts) {
      return this.favoriteProducts;
    }

    this.favoriteProducts = JSON.parse(localStorage.getItem(FAVORITE_PRODUCTS)) || [];
    return this.favoriteProducts;
  }

  addCartProduct(favoriteProduct: Product): void {
    const duplicatedFavoriteProduct = this.favoriteProducts.find((existsFavoriteProduct) => {
      return existsFavoriteProduct.id === favoriteProduct.id;
    });

    if (duplicatedFavoriteProduct) {
      return;
    }

    this.favoriteProducts = this.favoriteProducts.concat(favoriteProduct);
    localStorage.setItem(FAVORITE_PRODUCTS, JSON.stringify(this.favoriteProducts));
  }

  removeCartProduct(favoriteProductId: number): void {
    const favoriteProductIndex = this.favoriteProducts.findIndex((favoriteProduct) => favoriteProduct.id === favoriteProductId);
    this.favoriteProducts = this.favoriteProducts.splice(favoriteProductIndex, 1);
    localStorage.setItem(FAVORITE_PRODUCTS, JSON.stringify(this.favoriteProducts));
  }
}
