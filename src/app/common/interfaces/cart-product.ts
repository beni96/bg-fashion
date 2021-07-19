import { ColorWithImages, Product } from './product';

export interface CartProduct {
  productId: number;
  colorName: string;
  size: string | number;
  quantity: number;
}

export interface CartProductExtended {
  product: Product;
  colorWithImages: ColorWithImages;
  size: string | number;
  quantity: number;
}
