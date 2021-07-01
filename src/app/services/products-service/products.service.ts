import { Injectable } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product';
import { PRODUCTS } from 'src/app/common/products/products';

export const PARTNER_HUB_PARTNER_ID_COOKIE = 'partnerhub_partner_id';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[];

  getProducts(): Product[] {
    if (this.products) {
      return this.products;
    }

    this.products = PRODUCTS;
    return this.products;
  }

  getProductsByCategories(category: string, subcategory: string, productIdToExclude?: number): Product[] {
    return this.getProducts().filter((product) => {
      if (productIdToExclude && product.id === productIdToExclude) {
        return false;
      }

      const isProductIncludesCategory = product.categories.includes(category);
      return subcategory ? isProductIncludesCategory && product.subcategories.includes(subcategory) : isProductIncludesCategory;
    });
  }

  getProductById(productId: number): Product {
    return this.getProducts().find((product) => product.id === productId);
  }
}
