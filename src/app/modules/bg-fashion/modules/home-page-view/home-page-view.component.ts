import { Component } from '@angular/core';
import { BgFashionPath, BG_FASHION_PREFIX } from '../../router/bg-fashion.routes.names';

export interface CategoryImageLink {
  imageUrl: string;
  title: string;
  category: string;
  subcategory?: string;
}

@Component({
  selector: 'app-home-page-view',
  templateUrl: './home-page-view.component.html',
  styleUrls: ['./home-page-view.component.scss'],
})
export class HomePageViewComponent {
  homeImage: CategoryImageLink = {
    imageUrl: 'assets/images/back-to-life.jpg',
    title: 'Back to life',
    category: 'clothes',
  };

  categories: CategoryImageLink[] = [
    { imageUrl: 'assets/images/accessories-category.jpg', title: 'Accessories', category: 'accessories' },
    { imageUrl: 'assets/images/shoes-category.jpg', title: 'Shoes', category: 'shoes' },
    { imageUrl: 'assets/images/t-shirts-category.jpg', title: 'T-Shirts', category: 'clothes', subcategory: 't-shirts' },
    { imageUrl: 'assets/images/jeans-category.jpg', title: 'Jeans', category: 'clothes', subcategory: 'jeans' },
  ];

  moreCategories: CategoryImageLink[] = [
    { imageUrl: 'assets/images/dress-up.jpg', title: 'Dress Up.', category: 'clothes', subcategory: 'dresses' },
    { imageUrl: 'assets/images/sale.jpg', title: 'SALE', category: 'sale' },
  ];

  getLink(categoryImageLink: CategoryImageLink) {
    const linkSuffix = categoryImageLink.subcategory ? `/${BgFashionPath.Subcategory}/${categoryImageLink.subcategory}` : '';
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Category}/${categoryImageLink.category}` + linkSuffix;
  }
}
