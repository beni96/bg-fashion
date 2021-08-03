import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { FirebaseStub } from 'src/app/tokens/firebase/firebase-stub';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';
import { SHIRTS_SIZES } from '../../../../common/products/types';
import { ProductViewComponent } from './product-view.component';

describe('ProductViewComponent', () => {
  let fixture: ComponentFixture<ProductViewComponent>;
  let component: ProductViewComponent;
  let debugElement: DebugElement;
  let router: Router;
  let cartMock: jasmine.SpyObj<CartService>;
  let favoritesMock: jasmine.SpyObj<FavoritesService>;
  const paramMap = convertToParamMap({ category: 'clothes', id: '5' });
  const queryParamMap = convertToParamMap({ color: 1 });
  const firebaseMock = new FirebaseStub();

  beforeEach(async(() => {
    cartMock = jasmine.createSpyObj('CartService', ['addCartProduct']);
    favoritesMock = jasmine.createSpyObj('FavoritesService', ['addFavoriteProduct']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductViewComponent],
      providers: [
        { provide: CartService, useValue: cartMock },
        { provide: FavoritesService, useValue: favoritesMock },
        { provide: ActivatedRoute, useValue: { paramMap: of(paramMap), queryParamMap: of(queryParamMap) } },
        { provide: FIREBASE_TOKEN, useValue: firebaseMock },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    cartMock.addCartProduct.and.returnValue();
    favoritesMock.addFavoriteProduct.and.returnValue();
    fixture.detectChanges();

    spyOn(router, 'navigate');
    spyOn(component.snackbarLabelSubject$, 'next');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set product', () => {
    expect(component.product.title).toEqual('Printted T-shirt');
    expect(component.product.categories).toEqual(['clothes', 'sale']);
  });

  it('should set sizes', () => {
    expect(component.sizes).toEqual(SHIRTS_SIZES);
  });

  it('should set selected color', () => {
    expect(component.selectedColor.color.hexCode).toEqual('#ffffff');
  });

  it('should set selectedColor on selecting color', () => {
    const color = debugElement.queryAll(By.css('app-color'))[1];
    color.triggerEventHandler('colorSelected', null);
    expect(component.selectedColor).toEqual(component.product.colorsWithImages[1]);
  });

  it('should set selectedSize on selecting size', () => {
    const size = debugElement.queryAll(By.css('app-size'))[1];
    size.triggerEventHandler('sizeSelected', null);
    expect(component.selectedSize).toEqual(component.sizes[1]);
  });

  it('should set quantity on changing the quantity', () => {
    const quantity = debugElement.query(By.css('app-quantity'));
    quantity.triggerEventHandler('quantityChanged', 2);
    expect(component.quantity).toEqual(2);
  });

  it('should navigate to the product page on clicking it', () => {
    const products = debugElement.query(By.css('app-products'));
    products.triggerEventHandler('productClicked', { productId: 1, selectedColorIndex: 1 });
    expect(router.navigate).toHaveBeenCalledWith([`../${component.moreProducts[0].id}`], {
      // @ts-ignore
      relativeTo: component.route,
      queryParams: { color: 1 },
    });
  });

  it('should add to cart and show snackbar on clicking cart button', () => {
    component.selectedSize = 'sm';
    const cartButton = debugElement.queryAll(By.css('app-button'))[0];
    cartButton.triggerEventHandler('click', null);
    expect(cartMock.addCartProduct).toHaveBeenCalled();
    expect(component.snackbarLabelSubject$.next).toHaveBeenCalledWith('Item was added to cart');
  });

  it('should add to favorites and show snackbar on clicking favorites button', () => {
    const favoritesButton = debugElement.queryAll(By.css('app-button'))[1];
    favoritesButton.triggerEventHandler('click', null);
    expect(favoritesMock.addFavoriteProduct).toHaveBeenCalled();
    expect(component.snackbarLabelSubject$.next).toHaveBeenCalledWith('Item was added to favorites');
  });
});
