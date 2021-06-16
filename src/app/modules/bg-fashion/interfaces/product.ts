import {
  ACCESSORIES_SUBCATEGORY_TYPES,
  CATEGORY_AND_SUBCATEGORY_TYPES,
  CLOTHES_SUBCATEGORY_TYPES,
  COLOR_TYPES,
  SHOES_SUBCATEGORY_TYPES,
  SIZE_TYPES,
} from '../common/types';

export type ClothesSubcategory = typeof CLOTHES_SUBCATEGORY_TYPES[number];
export type shoesSubcategory = typeof SHOES_SUBCATEGORY_TYPES[number];
export type AccessoriesSubcategory = typeof ACCESSORIES_SUBCATEGORY_TYPES[number];
export type CategoryAndSubcategory = typeof CATEGORY_AND_SUBCATEGORY_TYPES[number];
export type Color = typeof COLOR_TYPES[number];
export type Size = typeof SIZE_TYPES[number];

export interface ColorWithImage {
  color: Color;
  images: string[];
}

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  sizes: Size[];
  colorsWithImages: ColorWithImage[];
  CategoriesAndSubcategories: CategoryAndSubcategory[];
}
