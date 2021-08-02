import { Product, SizesType } from '../interfaces/product';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Solid T-shirt',
    subtitle: 'Solid Short Sleeve T shirt',
    price: 18,
    sizesType: SizesType.SHIRTS,
    sizes: ['sm', 'md', 'lg', 'xl'],
    colorsWithImages: [
      {
        color: { name: 'white', hexCode: '#ffffff' },
        images: ['assets/images/products-images/t-shirt-white-1.jpg', 'assets/images/products-images/t-shirt-white-2.jpg'],
      },
      {
        color: { name: 'red', hexCode: '#f10f29' },
        images: ['assets/images/products-images/t-shirt-red-basic-1.jpg', 'assets/images/products-images/t-shirt-red-basic-2.jpg'],
      },
    ],
    categories: ['clothes'],
    subcategories: ['t-shirts'],
  },
  {
    id: 2,
    title: 'Letter graphic T-shirt',
    subtitle: 'Nice t-shirt with cool print',
    price: 22.8,
    sizesType: SizesType.SHIRTS,
    sizes: ['xs', 'sm', 'md', 'lg'],
    defaultColorIndex: 1,
    colorsWithImages: [
      {
        color: { name: 'black', hexCode: '#000000' },
        images: ['assets/images/products-images/t-shirt-black-1.jpg', 'assets/images/products-images/t-shirt-black-2.jpg'],
      },
      {
        color: { name: 'green', hexCode: '#02dd02' },
        images: ['assets/images/products-images/t-shirt-green-1.jpg', 'assets/images/products-images/t-shirt-green-2.jpg'],
      },
      {
        color: { name: 'red', hexCode: '#f10f29' },
        images: ['assets/images/products-images/t-shirt-red-1.jpg', 'assets/images/products-images/t-shirt-red-2.jpg'],
      },
    ],
    categories: ['clothes'],
    subcategories: ['t-shirts'],
  },
  {
    id: 3,
    title: 'Beach Shirt',
    subtitle: 'Solid beach shirt with long sleeves',
    price: 17.9,
    sizesType: SizesType.SHIRTS,
    sizes: ['sm', 'md', 'lg'],
    colorsWithImages: [
      {
        color: { name: 'white', hexCode: '#ffffff' },
        images: ['assets/images/products-images/shirt-1.jpg', 'assets/images/products-images/shirt-2.jpg'],
      },
    ],
    categories: ['clothes'],
    subcategories: ['shirts'],
  },
  {
    id: 4,
    title: 'Shorts Jeans',
    subtitle: 'High-rise Ripped Raw Hem Denim Shorts',
    price: 34.9,
    sizesType: SizesType.PANTS,
    sizes: [32, 36, 38, 40],
    colorsWithImages: [
      {
        color: { name: 'blue', hexCode: '#3333ff' },
        images: ['assets/images/products-images/short-jeans.jpg', 'assets/images/products-images/short-jeans.jpg'],
      },
    ],
    categories: ['clothes'],
    subcategories: ['jeans', 'shorts'],
  },
  {
    id: 5,
    title: 'Printted T-shirt',
    subtitle: 'Nice t-shirt with cool print',
    previousPrice: 45,
    price: 19.9,
    sizesType: SizesType.SHIRTS,
    sizes: ['sm', 'md', 'lg'],
    colorsWithImages: [
      {
        color: { name: 'black', hexCode: '#000000' },
        images: ['assets/images/products-images/t-shirt-black-basic-1.jpg', 'assets/images/products-images/t-shirt-black-basic-2.jpg'],
      },
      {
        color: { name: 'white', hexCode: '#ffffff' },
        images: ['assets/images/products-images/t-shirt-white.jpg', 'assets/images/products-images/t-shirt-white.jpg'],
      },
    ],
    categories: ['clothes', 'sale'],
    subcategories: ['t-shirts'],
  },
  {
    id: 6,
    title: 'Sneakers',
    subtitle: 'Brand new sneakers',
    price: 21.5,
    sizesType: SizesType.SHOES,
    sizes: [38, 39, 40],
    colorsWithImages: [
      {
        color: { name: 'black', hexCode: '#000000' },
        images: ['assets/images/products-images/sneakers-1.jpg', 'assets/images/products-images/sneakers-2.jpg'],
      },
    ],
    categories: ['shoes'],
    subcategories: ['sneakers'],
  },
  {
    id: 7,
    title: 'sunglasses',
    subtitle: 'Brand new designed sunglasses',
    previousPrice: 36,
    price: 14.9,
    defaultColorIndex: 1,
    colorsWithImages: [
      {
        color: { name: 'black', hexCode: '#000000' },
        images: ['assets/images/products-images/sunglasses-black-1.jpg', 'assets/images/products-images/sunglasses-black-2.jpg'],
      },
      {
        color: { name: 'red', hexCode: '#f10f29' },
        images: ['assets/images/products-images/sunglasses-red-1.jpg', 'assets/images/products-images/sunglasses-red-1.jpg'],
      },
    ],
    categories: ['accessories', 'sale'],
    subcategories: ['sunglasses'],
  },
  {
    id: 8,
    title: 'Dress',
    subtitle: 'High quality traditional summer dress',
    price: 42.5,
    sizesType: SizesType.SHIRTS,
    sizes: ['sm', 'md', 'lg'],
    colorsWithImages: [
      {
        color: { name: 'red', hexCode: '#f10f29' },
        images: ['assets/images/products-images/dress-1.jpg', 'assets/images/products-images/dress-2.jpg'],
      },
    ],
    categories: ['clothes'],
    subcategories: ['dresses'],
  },
  {
    id: 9,
    title: 'Jeans',
    subtitle: 'classic washed jeans',
    price: 39.9,
    sizesType: SizesType.PANTS,
    sizes: [34, 36, 38, 40],
    colorsWithImages: [
      {
        color: { name: 'blue', hexCode: '#3333ff' },
        images: ['assets/images/products-images/jeans-1.jpg', 'assets/images/products-images/jeans-2.jpg'],
      },
    ],
    categories: ['clothes'],
    subcategories: ['jeans'],
  },
  {
    id: 10,
    title: 'Boots',
    subtitle: 'Brand new Boots',
    price: 24,
    sizesType: SizesType.SHOES,
    sizes: [37, 38, 39, 40],
    colorsWithImages: [
      {
        color: { name: 'black', hexCode: '#000000' },
        images: ['assets/images/products-images/boots-1.jpg', 'assets/images/products-images/boots-2.jpg'],
      },
    ],
    categories: ['shoes'],
    subcategories: ['boots'],
  },
  {
    id: 11,
    title: 'Hat',
    subtitle: 'Knitted winter fashion hat',
    previousPrice: 24.9,
    price: 19.9,
    defaultColorIndex: 1,
    colorsWithImages: [
      {
        color: { name: 'red', hexCode: '#f10f29' },
        images: ['assets/images/products-images/hat-red-1.jpg', 'assets/images/products-images/hat-red-1.jpg'],
      },
      {
        color: { name: 'yellow', hexCode: '#fbe43a' },
        images: ['assets/images/products-images/hat-yellow-1.jpg', 'assets/images/products-images/hat-yellow-2.jpg'],
      },
    ],
    categories: ['accessories', 'sale'],
    subcategories: ['hats'],
  },
];
