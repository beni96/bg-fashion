import { SizesType } from '../interfaces/product';
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
