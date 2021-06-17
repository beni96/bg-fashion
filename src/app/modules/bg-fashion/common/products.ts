import { Product } from '../interfaces/product';

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: '',
    subtitle: '',
    price: 20,
    sizes: { sizeType: 'shirts', sizeNames: ['sm', 'md', 'lg'] },
    colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [] }],
    categories: ['clothes', 'sale'],
    subcategories: ['t-shirts'],
  },
  {
    id: 5,
    title: '',
    subtitle: '',
    price: 20,
    sizes: { sizeType: 'shirts', sizeNames: ['sm', 'md', 'lg'] },
    colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [] }],
    categories: ['clothes', 'sale'],
    subcategories: ['t-shirts'],
  },
  {
    id: 2,
    title: '',
    subtitle: '',
    price: 20,
    sizes: { sizeType: 'shirts', sizeNames: ['sm', 'md', 'lg'] },
    colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [] }],
    categories: ['shoes'],
    subcategories: ['sneakers'],
  },
  {
    id: 3,
    title: '',
    subtitle: '',
    price: 20,
    sizes: { sizeType: 'shirts', sizeNames: ['sm', 'md', 'lg'] },
    colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [] }],
    categories: ['accessories'],
    subcategories: ['sunglasses'],
  },
];
