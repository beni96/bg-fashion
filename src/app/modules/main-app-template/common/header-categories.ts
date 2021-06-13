import { HeaderCategory, HeaderMenuCategories } from '../interfaces/header-category';

const CLOTHES_MENU_CATEGORIES: HeaderMenuCategories[] = [
  { title: 'T-shirts', linkUrl: '/' },
  { title: 'Shirts', linkUrl: '/' },
  { title: 'Jeans', linkUrl: '/' },
  { title: 'Shorts', linkUrl: '/' },
  { title: 'Dresses', linkUrl: '/' },
  { title: 'Jackets', linkUrl: '/' },
  { title: 'Coats', linkUrl: '/' },
  { title: 'Blazers', linkUrl: '/' },
];

const SHOES_MENU_CATEGORIES: HeaderMenuCategories[] = [
  { title: 'Sneakers', linkUrl: '/' },
  { title: 'Boots', linkUrl: '/' },
  { title: 'Sandals', linkUrl: '/' },
];

const ACCESSORIES_MENU_CATEGORIES: HeaderMenuCategories[] = [
  { title: 'Sunglasses', linkUrl: '/' },
  { title: 'Hats', linkUrl: '/' },
  { title: 'Bracelets', linkUrl: '/' },
];

export const HEADER_CATEGORIES: HeaderCategory[] = [
  { title: 'Clothes', menuImageUrl: 'assets/images/clothes-header.jpg', linkUrl: '/', menuCategories: CLOTHES_MENU_CATEGORIES },
  { title: 'Shoes', menuImageUrl: 'assets/images/shoes-header.jpg', linkUrl: '/', menuCategories: SHOES_MENU_CATEGORIES },
  { title: 'Accessories', menuImageUrl: 'assets/images/accessories-header.jpg', linkUrl: '/', menuCategories: ACCESSORIES_MENU_CATEGORIES },
  { title: 'Sale', linkUrl: '/' },
];
