import { TestBed } from '@angular/core/testing';
import { PRODUCTS } from 'src/app/common/products/products';
import { FavoritesService } from './favorites.service';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({}).compileComponents();

    service = TestBed.inject(FavoritesService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  describe('with saved values', () => {
    it('should return the saved cartProducts', () => {
      // @ts-ignore
      service.favoriteProducts = [PRODUCTS[0]];
      expect(service.getFavoriteProducts()).toEqual([PRODUCTS[0]]);
    });
  });

  describe('without saved values', () => {
    it('should return cartProducts', () => {
      const favoriteProducts = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
      expect(service.getFavoriteProducts()).toEqual(favoriteProducts);
    });
  });
});
