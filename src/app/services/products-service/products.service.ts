import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Color, Product } from 'src/app/common/interfaces/product';
import { PRODUCTS } from 'src/app/common/products/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: Product[];
  private categories: string[];
  private categoriesSubject$: BehaviorSubject<string[]>;

  constructor() {
    this.categoriesSubject$ = new BehaviorSubject(this.getCategories());
  }

  getProducts(): Product[] {
    if (this.products) {
      return this.products;
    }

    this.products = PRODUCTS;
    return this.products || [];
  }

  addProduct(product: Product) {
    this.products = this.products.concat(product);
  }

  setProduct(product: Product) {
    const index = this.products.findIndex((currentProduct) => currentProduct.id === product.id);
    this.products[index] = product;
    this.clearCache();
  }

  removeProduct(id: number) {
    this.products = this.products.filter((product) => product.id !== id);
    this.clearCache();
  }

  getProductsByCategories(
    category: string,
    subcategory?: string,
    colors?: string[],
    sizes?: any[],
    productIdToExclude?: number
  ): Product[] {
    return this.getProducts().filter((product) => {
      if (productIdToExclude && product.id === productIdToExclude) {
        return false;
      }

      const includesCategory = product.categories.includes(category);
      const includesSubcategory = !subcategory || product.subcategories.includes(subcategory);
      const includesColors =
        !colors?.length || product.colorsWithImages.some((colorWithImages) => colors.includes(colorWithImages.color.name));
      const includesSizes = !sizes?.length || product.sizes?.some((size) => sizes.includes(size));

      return includesCategory && includesSubcategory && includesColors && includesSizes;
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

  getColors(category: string, subcategory?: string, sizes?: any): Color[] {
    const products = this.getProducts().filter((product) => {
      const includesCategory = product.categories.includes(category);
      const includesSubcategory = !subcategory || product.subcategories.includes(subcategory);
      const includesSizes = !sizes?.length || product.sizes?.some((size) => sizes.includes(size));

      return includesCategory && includesSubcategory && includesSizes;
    });

    let colors: Color[] = [];
    products.forEach((product) => {
      product.colorsWithImages.forEach((colorWithImages) => (colors = colors.concat(colorWithImages.color)));
    });

    colors = colors.filter((color, index) => !colors.slice(index + 1).some((c) => color.name === c.name));
    return colors;
  }

  getSizes(category: string, subcategory?: string, colors?: string[]): any[] {
    const products = this.getProducts().filter((product) => {
      const includesCategory = product.categories.includes(category);
      const includesSubcategory = !subcategory || product.subcategories.includes(subcategory);
      const includesColors =
        !colors?.length || product.colorsWithImages.some((colorsWithImages) => colors.includes(colorsWithImages.color.name));

      return includesCategory && includesSubcategory && includesColors;
    });

    let sizes: any[] = [];
    products.forEach((product) => {
      product.sizes?.forEach((size) => (sizes = sizes.concat(size)));
    });

    sizes = sizes.filter((size, index) => !sizes.slice(index + 1).includes(size));
    return sizes;
  }

  clearCache() {
    this.categories = null;
    this.categoriesSubject$.next(this.getCategories());
  }
}
