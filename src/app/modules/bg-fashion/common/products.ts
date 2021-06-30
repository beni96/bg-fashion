import { Product } from '../interfaces/product';

const img = 'assets/images/t-shirts-category.jpg';
const img2 = 'assets/images/shoes-category.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'T-shirt',
    subtitle: 'Nice t-shirt with cool print',
    previousPrice: 40,
    price: 20,
    sizes: ['sm', 'md', 'lg'],
    colorsWithImages: [
      { color: { name: 'black', hexCode: '#000000' }, images: [img, img2] },
      { color: { name: 'red', hexCode: '#f10f29' }, images: [img2] },
    ],
    categories: ['clothes', 'sale'],
    subcategories: ['t-shirts'],
  },
  {
    id: 2,
    title: 'Sneakers',
    subtitle: 'Brand new sneakers',
    price: 20,
    sizes: [38, 39, 40],
    colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [img] }],
    categories: ['shoes'],
    subcategories: ['sneakers'],
  },
  {
    id: 3,
    title: 'sunglasses',
    subtitle: 'Black designed sunglasses',
    previousPrice: 30,
    price: 20,
    defaultColorIndex: 1,
    colorsWithImages: [
      { color: { name: 'black', hexCode: '#000000' }, images: [img] },
      { color: { name: 'red', hexCode: '#f10f29' }, images: [img2] },
    ],
    categories: ['accessories', 'sale'],
    subcategories: ['sunglasses'],
  },
  {
    id: 4,
    title: 'Dress',
    subtitle: '',
    price: 20,
    sizes: ['sm', 'md', 'lg'],
    colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [img] }],
    categories: ['clothes'],
    subcategories: ['dresses'],
  },
  {
    id: 5,
    title: 'Beach Shirt',
    subtitle: '',
    price: 20,
    sizes: ['sm', 'md', 'lg'],
    colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [img] }],
    categories: ['clothes'],
    subcategories: ['shirts'],
  },
];
