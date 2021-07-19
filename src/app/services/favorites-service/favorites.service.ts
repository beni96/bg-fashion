import { Injectable } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product';
import { ProductsService } from '../products-service/products.service';

const FAVORITE_PRODUCTS = 'favoriteProducts';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoriteProductIds: number[];
  private favoriteProducts: Product[];

  constructor(private productsService: ProductsService) {
    this.getFavoriteProductIds();
  }

  private getFavoriteProductIds(): number[] {
    if (this.favoriteProductIds) {
      return this.favoriteProductIds;
    }

    this.favoriteProductIds = JSON.parse(localStorage.getItem(FAVORITE_PRODUCTS)) || [];
    return this.favoriteProductIds;
  }

  getFavoriteProducts(): Product[] {
    if (this.favoriteProducts) {
      return this.favoriteProducts;
    }

    this.favoriteProducts = this.getFavoriteProductIds().map((favoriteProductId) => {
      const product = this.productsService.getProductById(favoriteProductId);
      return product ?? null;
    });
    this.favoriteProducts = this.favoriteProducts.filter((favoriteProduct) => !!favoriteProduct);
    return this.favoriteProducts;
  }

  addFavoriteProduct(favoriteProductId: number): void {
    const duplicatedFavoriteProduct = this.getFavoriteProductIds().find((existsFavoriteProductId) => {
      return existsFavoriteProductId === favoriteProductId;
    });

    if (duplicatedFavoriteProduct) {
      return;
    }

    this.favoriteProductIds = this.favoriteProductIds.concat(favoriteProductId);
    localStorage.setItem(FAVORITE_PRODUCTS, JSON.stringify(this.favoriteProductIds));
    this.clearFavoriteProductsCache();
  }

  removeFavoriteProduct(productId: number): void {
    const favoriteProductIndex = this.getFavoriteProductIds().findIndex((favoriteProductId) => favoriteProductId === productId);
    this.favoriteProductIds.splice(favoriteProductIndex, 1);
    localStorage.setItem(FAVORITE_PRODUCTS, JSON.stringify(this.favoriteProductIds));
    this.clearFavoriteProductsCache();
  }

  isFavoriteProduct(productId: number) {
    return this.getFavoriteProductIds().some((favoriteProductId) => favoriteProductId === productId);
  }

  clearCache(): void {
    this.favoriteProductIds = null;
    this.favoriteProducts = null;
  }

  clearFavoriteProductsCache() {
    this.favoriteProducts = null;
  }
}
