import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from 'src/app/common/interfaces/product';
import { PRODUCTS } from 'src/app/common/products/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[];
  private categories: string[];
  private categoriesSubject$: Subject<string[]> = new Subject();

  constructor() {
    this.categoriesSubject$.next(this.getCategories());
  }

  getProducts(): Product[] {
    if (this.products) {
      return this.products;
    }

    this.products = PRODUCTS;
    return this.products || [];
  }

  addProduct(product: Product) {
    this.products = PRODUCTS.concat(product);
  }

  setProduct(product: Product, index: number) {
    PRODUCTS[index] = product;
    this.clearCache();
  }

  removeProduct(index: number) {
    PRODUCTS.splice(index, 1);
    this.clearCache();
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

  getCategoriesSubject(): Observable<string[]> {
    return this.categoriesSubject$;
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

  clearCache() {
    this.products = null;
    this.categories = null;
    this.categoriesSubject$.next(this.getCategories());
  }
}
