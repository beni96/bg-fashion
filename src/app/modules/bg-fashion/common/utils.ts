import { FormControl } from '@angular/forms';
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
    case SizesType.PANTS:
      return PANTS_SIZES;
    case SizesType.SHOES:
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

export const getFormErrorMessages = (fieldNames, formControls: { [key: string]: FormControl }, messages) => {
  const errorMessages = {};
  fieldNames.forEach((fieldName) => {
    const errors = formControls[fieldName].errors;
    if (errors) {
      const fieldErrorNames = Object.keys(errors);
      const errorName = fieldErrorNames[0];
      errorMessages[fieldName] = errorName === 'required' ? 'Required' : messages[fieldName][errorName];
    }
  });
  return errorMessages;
};
