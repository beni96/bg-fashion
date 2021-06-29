import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SHIRTS_SIZES } from '../../common/types';
import { ProductViewComponent } from './product-view.component';

describe('ProductViewComponent', () => {
  let fixture: ComponentFixture<ProductViewComponent>;
  let component: ProductViewComponent;
  let debugElement: DebugElement;
  let router: Router;
  const paramMap = convertToParamMap({ category: 'clothes', id: '1' });
  const queryParamMap = convertToParamMap({ color: 1 });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductViewComponent],
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(paramMap), queryParamMap: of(queryParamMap) } }],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(router, 'navigate');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set product', () => {
    expect(component.product.title).toEqual('T-shirt');
    expect(component.product.categories).toEqual(['clothes', 'sale']);
  });

  it('should set sizes', () => {
    expect(component.sizes).toEqual(SHIRTS_SIZES);
  });

  it('should set selected color', () => {
    expect(component.selectedColor.color.hexCode).toEqual('#f10f29');
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
    const product = debugElement.queryAll(By.css('app-product'))[0];
    product.triggerEventHandler('productClicked', 2);
    expect(router.navigate).toHaveBeenCalledWith([`../${component.moreProducts[0].id}`], {
      // @ts-ignore
      relativeTo: component.route,
      queryParams: { color: 2 },
    });
  });
});
