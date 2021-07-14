import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/common/interfaces/product';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
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

  beforeEach(async(() => {
    favoritesMock = jasmine.createSpyObj('FavoritesService', ['getFavoriteProducts', 'removeFavoriteProduct']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [FavoritesViewComponent],
      providers: [{ provide: FavoritesService, useValue: favoritesMock }],
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

  it('should set imgHeight to 4', () => {
    // @ts-ignore
    component.hostElement.nativeElement.style.width = '140px';
    component.getImgHeight();
    expect(component.imgHeight).toEqual(4);
  });

  it('should navigate to the product page on clicking it', () => {
    const product = debugElement.queryAll(By.css('app-product'))[0];
    product.triggerEventHandler('productClicked', 2);
    expect(router.navigate).toHaveBeenCalledWith([BgFashionPath.Product, component.favoriteProducts[0].id], {
      queryParams: { color: 2 },
    });
  });

  it('should remove product from favorites on clicking trash', () => {
    const product = debugElement.queryAll(By.css('app-product'))[0];
    product.triggerEventHandler('trashClicked', null);
    expect(favoritesMock.removeFavoriteProduct).toHaveBeenCalledWith(component.favoriteProducts[0].id);
  });
});