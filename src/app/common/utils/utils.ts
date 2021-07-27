import { FormControl } from '@angular/forms';
import { CartProductExtended } from 'src/app/common/interfaces/cart-product';
import { SizesType } from '../interfaces/product';
import { PANTS_SIZES, SHIRTS_SIZES, SHOES_SIZES } from '../products/types';

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

export const getImgHeight = (totalWidth: number, imagePadding: number, screenWidth?: number) => {
  const columnsNum = screenWidth ? getProdcutsColumnsCount(screenWidth) : 1;
  const imageRatio = 4 / 3;
  const imageWidth = totalWidth / columnsNum - imagePadding;
  return imageWidth * imageRatio;
};

const getProdcutsColumnsCount = (screenWidth: number) => {
  switch (true) {
    case screenWidth < 760:
      return 2;
    case screenWidth < 998:
      return 3;
    default:
      return 4;
  }
};

export const getTotalPrice = (cartProducts: CartProductExtended[]): number => {
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
