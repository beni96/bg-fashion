export interface Size {
  sizeType: string;
  sizeNames: string[];
}

export interface Color {
  name: string;
  hexCode: string;
}

export interface ColorWithImages {
  color: Color;
  images: string[];
}

export interface Product {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  sizes?: Size;
  colorsWithImages: ColorWithImages[];
  categories: string[];
  subcategories: string[];
}
