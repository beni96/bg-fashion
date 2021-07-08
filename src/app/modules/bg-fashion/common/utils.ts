import { CartProduct } from 'src/app/common/interfaces/cart-product';
import { SizesType } from '../../../common/interfaces/product';
import { PANTS_SIZES, SHIRTS_SIZES, SHOES_SIZES } from './types';

export const isEnterOrSpacePressed = (event: KeyboardEvent) => {
  if (event.code === 'Enter' || event.code === 'Space') {
    event?.stopPropagation();
    event?.preventDefault();
    return true;
  }

  return false;
};

export const getSizes = (sizesType: SizesType) => {
  switch (sizesType) {
    case 'pants':
      return PANTS_SIZES;
    case 'shoes':
      return SHOES_SIZES;
    default:
      return SHIRTS_SIZES;
  }
};

export const getImgHeight = (imageRatio: number, columnsNum: number, totalWidth: number, imagePadding: number) => {
  const imageWidth = totalWidth / columnsNum - imagePadding;
  return imageWidth * imageRatio;
};

export const getTotalPrice = (cartProducts: CartProduct[]): number => {
  let totalPrice = 0;
  cartProducts.forEach((cartProduct) => {
    totalPrice += cartProduct.quantity * cartProduct.product.price;
  });
  return totalPrice;
};
