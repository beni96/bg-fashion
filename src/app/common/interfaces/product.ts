export interface Color {
  name: string;
  hexCode: string;
}

export interface ColorWithImages {
  color: Color;
  images: string[];
}

export enum SizesType {
  SHIRTS = 'shirts',
  PANTS = 'pants',
  SHOES = 'shoes',
}

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  previousPrice?: number;
  sizesType?: SizesType;
  sizes?: string[] | number[];
  colorsWithImages: ColorWithImages[];
  defaultColorIndex?: number;
  categories: string[];
  subcategories: string[];
}
