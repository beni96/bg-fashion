import { Injectable } from '@angular/core';
import { Product } from 'src/app/common/interfaces/product';
import { PRODUCTS } from 'src/app/common/products/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[];
  private categories: string[];

  getProducts(): Product[] {
    if (this.products) {
      return this.products;
    }

    this.products = PRODUCTS;
    return this.products;
  }

  getProductsByCategories(category: string, subcategory?: string, productIdToExclude?: number): Product[] {
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

  getCategories(): string[] {
    if (this.categories) {
      return this.categories;
    }
    this.categories = [];
    this.getProducts().forEach((product) => {
      product.categories.forEach((category) => {
        if (this.categories.includes(category)) {
          return;
        }
        this.categories = this.categories.concat(category);
      });
    });
    return this.categories;
  }

  getSubcategories(category: string): string[] {
    let subcategories = [];
    this.getProductsByCategories(category).forEach((product) => {
      product.subcategories.forEach((subcategory) => {
        if (subcategories.includes(subcategory)) {
          return;
        }
        subcategories = subcategories.concat(subcategory);
      });
    });
    return subcategories;
  }
}
