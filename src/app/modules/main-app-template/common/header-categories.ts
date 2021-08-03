import { HeaderMenuImageUrl } from 'src/app/common/images-url/images-url';
import { HeaderCategory } from '../interfaces/header-category';

export const HEADER_CATEGORIES: HeaderCategory[] = [
  { category: 'clothes', menuImageUrl: HeaderMenuImageUrl.Clothes, menuCategories: [] },
  { category: 'shoes', menuImageUrl: HeaderMenuImageUrl.Shoes, menuCategories: [] },
  { category: 'accessories', menuImageUrl: HeaderMenuImageUrl.Accessories, menuCategories: [] },
  { category: 'sale', menuImageUrl: HeaderMenuImageUrl.Sale, menuCategories: [] },
];
