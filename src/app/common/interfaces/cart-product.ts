import { Product } from './product';

export interface CartProduct {
  product: Product;
  colorIndex: number;
  size: string | number;
  quantity: number;
}
