import { Component } from '@angular/core';

export interface Category {
  imageUrl: string;
  title: string;
}

@Component({
  selector: 'app-home-page-view',
  templateUrl: './home-page-view.component.html',
  styleUrls: ['./home-page-view.component.scss'],
})
export class HomePageViewComponent {
  categories: Category[] = [
    { imageUrl: 'assets/images/accessories-category.jpg', title: 'Accessories' },
    { imageUrl: 'assets/images/shoes-category.jpg', title: 'Shoes' },
    { imageUrl: 'assets/images/t-shirts-category.jpg', title: 'T-Shirts' },
    { imageUrl: 'assets/images/jeans-category.jpg', title: 'Jeans' },
  ];

  moreCategories: Category[] = [
    { imageUrl: 'assets/images/dress-up.jpg', title: 'Dress Up.' },
    { imageUrl: 'assets/images/sale.jpg', title: 'SALE' },
  ];
}
