import { TestBed } from '@angular/core/testing';
import { PRODUCTS } from 'src/app/common/products/products';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();

    service = TestBed.inject(ProductsService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('with saved values', () => {
    it('should return the saved products', () => {
      // @ts-ignore
      service.products = [PRODUCTS[0]];
      expect(service.getProducts()).toEqual([PRODUCTS[0]]);
    });
  });

  describe('without saved values', () => {
    it('should return products', () => {
      expect(service.getProducts()).toEqual(PRODUCTS);
    });
  });
});
