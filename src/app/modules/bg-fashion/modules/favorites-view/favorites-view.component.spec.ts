import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/common/interfaces/product';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { FirebaseStub } from 'src/app/tokens/firebase/firebase-stub';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { FavoritesViewComponent } from './favorites-view.component';

const FAVORITES_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'T-shirt',
    subtitle: 'Nice t-shirt with cool print',
    previousPrice: 40,
    price: 20,
    sizes: ['sm', 'md', 'lg'],
    colorsWithImages: [
      { color: { name: 'black', hexCode: '#000000' }, images: [] },
      { color: { name: 'red', hexCode: '#f10f29' }, images: [] },
    ],
    categories: ['clothes', 'sale'],
    subcategories: ['t-shirts'],
  },
  {
    id: 2,
    title: 'Sneakers',
    subtitle: 'Brand new sneakers',
    price: 20,
    sizes: [38, 39, 40],
    colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [] }],
    categories: ['shoes'],
    subcategories: ['sneakers'],
  },
];

describe('FavoritesViewComponent', () => {
  let fixture: ComponentFixture<FavoritesViewComponent>;
  let component: FavoritesViewComponent;
  let debugElement: DebugElement;
  let router: Router;
  let favoritesMock: jasmine.SpyObj<FavoritesService>;
  const firebaseMock = new FirebaseStub();

  beforeEach(async(() => {
    favoritesMock = jasmine.createSpyObj('FavoritesService', ['getFavoriteProducts', 'removeFavoriteProduct']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FavoritesViewComponent],
      providers: [
        { provide: FavoritesService, useValue: favoritesMock },
        { provide: FIREBASE_TOKEN, useValue: firebaseMock },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesViewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    favoritesMock.getFavoriteProducts.and.returnValue(FAVORITES_PRODUCTS);
    favoritesMock.removeFavoriteProduct.and.returnValue();
    fixture.detectChanges();

    spyOn(router, 'navigate');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the product page on clicking it', () => {
    const products = debugElement.query(By.css('app-products'));
    products.triggerEventHandler('productClicked', { productId: 1, selectedColorIndex: 2 });
    expect(router.navigate).toHaveBeenCalledWith([BgFashionPath.Product, component.favoriteProducts[0].id], {
      queryParams: { color: 2 },
    });
  });

  it('should remove product from favorites on clicking trash', () => {
    const products = debugElement.query(By.css('app-products'));
    products.triggerEventHandler('trashClicked', 1);
    expect(favoritesMock.removeFavoriteProduct).toHaveBeenCalledWith(component.favoriteProducts[0].id);
  });
});
