import { Injectable } from '@angular/core';
import { HomePageImageUrl } from 'src/app/common/images-url/images-url';
import { CategoryLink } from 'src/app/common/interfaces/category-link';

@Injectable({
  providedIn: 'root',
})
export class HomePageService {
  private categoryLinks: CategoryLink[] = [
    { imageUrl: HomePageImageUrl.BackToLife, title: 'Back to life', category: 'clothes' },
    { imageUrl: HomePageImageUrl.TShirts, title: 'T-Shirts', category: 'clothes', subcategory: 't-shirts' },
    { imageUrl: HomePageImageUrl.Shoes, title: 'Shoes', category: 'shoes' },
    { imageUrl: HomePageImageUrl.Accessories, title: 'Accessories', category: 'accessories' },
    { imageUrl: HomePageImageUrl.Jeans, title: 'Jeans', category: 'clothes', subcategory: 'jeans' },
    { imageUrl: HomePageImageUrl.DressUp, title: 'Dress Up.', category: 'clothes', subcategory: 'dresses' },
    { imageUrl: HomePageImageUrl.Sale, title: 'SALE', category: 'sale' },
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
