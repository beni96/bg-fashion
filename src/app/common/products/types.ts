export const CLOTHES_SUBCATEGORY_TYPES = ['t-shirts', 'shirts', 'jeans', 'shorts', 'dresses', 'jackets'] as const;
export const SHOES_SUBCATEGORY_TYPES = ['sneakers', 'boots', 'sandals'] as const;
export const ACCESSORIES_SUBCATEGORY_TYPES = ['sunglasses', 'hats', 'Bracelets'] as const;

export const COLOR_TYPES = [
  { name: 'black', hexCode: '#000000' },
  { name: 'white', hexCode: '#ffffff' },
  { name: 'red', hexCode: '#f10f29' },
  { name: 'blue', hexCode: '#3333ff' },
  { name: 'yellow', hexCode: '#fbe43a' },
  { name: 'gray', hexCode: '#8a868f' },
  { name: 'purple', hexCode: '#c9a0ff' },
  { name: 'green', hexCode: '#02dd02' },
];

export const CATEGORY_AND_SUBCATEGORY_TYPES = [
  { category: 'clothes', subcategory: CLOTHES_SUBCATEGORY_TYPES },
  { category: 'shoes', subcategory: SHOES_SUBCATEGORY_TYPES },
  { category: 'accessories', subcategory: ACCESSORIES_SUBCATEGORY_TYPES },
  { category: 'sale', subcategory: [...CLOTHES_SUBCATEGORY_TYPES, ...SHOES_SUBCATEGORY_TYPES, ...ACCESSORIES_SUBCATEGORY_TYPES] },
] as const;

export const SHIRTS_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];
export const PANTS_SIZES = [32, 34, 36, 38, 40];
export const SHOES_SIZES = [36, 37, 38, 39, 40];
