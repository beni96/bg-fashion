import { TestBed } from '@angular/core/testing';
import { CartProduct } from 'src/app/common/interfaces/cart-product';
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
      const cartProduct: CartProduct = { product: PRODUCTS[0], size: 'md', colorWithImages: PRODUCTS[0].colorsWithImages[0], quantity: 1 };
      // @ts-ignore
      service.cartProducts = [cartProduct];
      expect(service.getCartProducts()).toEqual([cartProduct]);
    });
  });

  describe('without saved values', () => {
    it('should return cartProducts', () => {
      const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
      expect(service.getCartProducts()).toEqual(cartProducts);
    });
  });
});
