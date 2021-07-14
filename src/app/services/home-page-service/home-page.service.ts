import { Injectable } from '@angular/core';
import { CategoryLink } from 'src/app/common/interfaces/category-link';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  private categoryLinks: CategoryLink[] = [
    { imageUrl: 'assets/images/back-to-life.jpg', title: 'Back to life', category: 'clothes' },
    { imageUrl: 'assets/images/accessories-category.jpg', title: 'Accessories', category: 'accessories' },
    { imageUrl: 'assets/images/shoes-category.jpg', title: 'Shoes', category: 'shoes' },
    { imageUrl: 'assets/images/t-shirts-category.jpg', title: 'T-Shirts', category: 'clothes', subcategory: 't-shirts' },
    { imageUrl: 'assets/images/jeans-category.jpg', title: 'Jeans', category: 'clothes', subcategory: 'jeans' },
    { imageUrl: 'assets/images/dress-up.jpg', title: 'Dress Up.', category: 'clothes', subcategory: 'dresses' },
    { imageUrl: 'assets/images/sale.jpg', title: 'SALE', category: 'sale' },
  ];

  constructor() {
    this.getCategoryLinks();
  }

  getCategoryLinks(): CategoryLink[] {
    return this.categoryLinks;
  }

  setCategoryLink(categoryLink: CategoryLink, index: number): void {
    this.categoryLinks[index] = categoryLink;
  }
}
