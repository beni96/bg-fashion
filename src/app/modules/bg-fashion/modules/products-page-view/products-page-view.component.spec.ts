import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Product } from 'src/app/common/interfaces/product';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { FirebaseStub } from 'src/app/tokens/firebase/firebase-stub';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { ProductsPageViewComponent } from './products-page-view.component';

const PRODUCT_MOCK: Product = {
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
};

describe('ProductsPageViewComponent', () => {
  let fixture: ComponentFixture<ProductsPageViewComponent>;
  let component: ProductsPageViewComponent;
  let debugElement: DebugElement;
  let router: Router;
  let productsServiceMock: jasmine.SpyObj<ProductsService>;
  const paramMap = convertToParamMap({ category: 'clothes' });
  const queryParamMap = convertToParamMap({ colors: 'red' });
  const firebaseMock = new FirebaseStub();

  beforeEach(async(() => {
    productsServiceMock = jasmine.createSpyObj('ProductsService', [
      'getProductsByCategories',
      'getCategories',
      'getSubcategories',
      'getColors',
      'getSizes',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductsPageViewComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { paramMap: of(paramMap), queryParamMap: of(queryParamMap) } },
        { provide: ProductsService, useValue: productsServiceMock },
        { provide: FIREBASE_TOKEN, useValue: firebaseMock },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPageViewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    productsServiceMock.getProductsByCategories.and.returnValue([PRODUCT_MOCK]);
    productsServiceMock.getCategories.and.returnValue(['clothes', 'shoes']);
    productsServiceMock.getSubcategories.and.returnValue(['t-shirts', 'jeans']);
    productsServiceMock.getSizes.and.returnValue(['sm', 'md']);
    productsServiceMock.getColors.and.returnValue([
      { name: 'red', hexCode: '' },
      { name: 'blue', hexCode: '' },
    ]);
    fixture.detectChanges();

    spyOn(router, 'navigate');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the product page on clicking it', () => {
    const products = debugElement.query(By.css('app-products'));
    products.triggerEventHandler('productClicked', { productId: 1, selectedColorIndex: 2 });
    expect(router.navigate).toHaveBeenCalledWith([BgFashionPath.Product, component.products[0].id], {
      // @ts-ignore
      relativeTo: component.route,
      queryParams: { color: 2 },
    });
  });

  it('should set filter bar selects options', () => {
    expect(component.categoryOptions).toEqual(['clothes', 'shoes']);
    expect(component.subcategoryOptions).toEqual(['t-shirts', 'jeans']);
    expect(component.sizeOptions).toEqual(['sm', 'md']);
    expect(component.colorOptions).toEqual([
      { name: 'red', hexCode: '' },
      { name: 'blue', hexCode: '' },
    ]);
    expect(component.colorNameOptions).toEqual(['red', 'blue']);
  });

  it('should navigate to category on selecting one', () => {
    const filterBar = debugElement.query(By.css('app-filter-bar'));
    filterBar.triggerEventHandler('categorySelected', 'shoes');
    expect(router.navigate).toHaveBeenCalledWith([BgFashionPath.Category, 'shoes']);
  });

  it('should set queryParams on selecting colors', () => {
    const filterBar = debugElement.query(By.css('app-filter-bar'));
    filterBar.triggerEventHandler('colorSelected', ['red', 'blue']);
    expect(router.navigate).toHaveBeenCalledWith([], {
      // @ts-ignore
      relativeTo: component.route,
      queryParams: { colors: 'red_blue' },
      queryParamsHandling: 'merge',
    });
  });
});
