import { TestBed } from '@angular/core/testing';
import { CartProductExtended } from 'src/app/common/interfaces/cart-product';
import { PRODUCTS } from 'src/app/common/products/products';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();

    service = TestBed.inject(CartService);
    spyOn(JSON, 'parse');
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('with saved values', () => {
    it('should return the saved cartProducts', () => {
      const extendedCartProducts: CartProductExtended = {
        product: PRODUCTS[0],
        size: 'md',
        colorWithImages: PRODUCTS[0].colorsWithImages[0],
        quantity: 1,
      };
      // @ts-ignore
      service.extendedCartProducts = [extendedCartProducts];
      expect(service.getExtendedCartProducts()).toEqual([extendedCartProducts]);
    });
  });

  describe('without saved values', () => {
    it('should return cartProducts', () => {
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
      expect(service.getExtendedCartProducts()).toEqual(cartProducts);
    });
  });
});
