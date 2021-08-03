import { ProdcutImageUrl } from '../images-url/images-url';
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
        images: [ProdcutImageUrl.TShirtWhite1, ProdcutImageUrl.TShirtWhite2],
      },
      {
        color: { name: 'red', hexCode: '#f10f29' },
        images: [ProdcutImageUrl.TShirtRedBasic1, ProdcutImageUrl.TShirtRedBasic2],
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
        images: [ProdcutImageUrl.TShirtBlack1, ProdcutImageUrl.TShirtBlack2],
      },
      {
        color: { name: 'green', hexCode: '#02dd02' },
        images: [ProdcutImageUrl.TShirtGreen1, ProdcutImageUrl.TShirtGreen2],
      },
      {
        color: { name: 'red', hexCode: '#f10f29' },
        images: [ProdcutImageUrl.TShirtRed1, ProdcutImageUrl.TShirtRed2],
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
        images: [ProdcutImageUrl.Shirt1, ProdcutImageUrl.Shirt2],
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
        images: [ProdcutImageUrl.ShortJeans, ProdcutImageUrl.ShortJeans],
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
        images: [ProdcutImageUrl.TShirtBlackBasic1, ProdcutImageUrl.TShirtBlackBasic2],
      },
      {
        color: { name: 'white', hexCode: '#ffffff' },
        images: [ProdcutImageUrl.TShirtWhite, ProdcutImageUrl.TShirtWhite],
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
        images: [ProdcutImageUrl.Sneakers1, ProdcutImageUrl.Sneakers2],
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
        images: [ProdcutImageUrl.SunglassesBlack1, ProdcutImageUrl.SunglassesBlack2],
      },
      {
        color: { name: 'red', hexCode: '#f10f29' },
        images: [ProdcutImageUrl.SunglassesRed1, ProdcutImageUrl.SunglassesRed2],
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
        images: [ProdcutImageUrl.Dress1, ProdcutImageUrl.Dress2],
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
        images: [ProdcutImageUrl.Jeans1, ProdcutImageUrl.Jeans2],
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
        images: [ProdcutImageUrl.Boots1, ProdcutImageUrl.Boots2],
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
        images: [ProdcutImageUrl.HatRed1, ProdcutImageUrl.HatRed2],
      },
      {
        color: { name: 'yellow', hexCode: '#fbe43a' },
        images: [ProdcutImageUrl.HatYellow1, ProdcutImageUrl.HatYellow2],
      },
    ],
    categories: ['accessories', 'sale'],
    subcategories: ['hats'],
  },
];
