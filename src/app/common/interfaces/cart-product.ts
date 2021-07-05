import { ColorWithImages, Product } from './product';

export interface CartProduct {
  product: Product;
  colorWithImages: ColorWithImages;
  size: string | number;
  quantity: number;
}
