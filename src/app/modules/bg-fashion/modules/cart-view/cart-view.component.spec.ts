import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { CartStep, CartViewComponent } from './cart-view.component';

describe('CartViewComponent', () => {
  let fixture: ComponentFixture<CartViewComponent>;
  let component: CartViewComponent;
  let debugElement: DebugElement;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartViewComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(router, 'navigate');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page on clicking cancel', () => {
    const cartTemplate = debugElement.query(By.css('app-cart-template'));
    cartTemplate.triggerEventHandler('cancelClicked', null);
    expect(router.navigate).toHaveBeenCalledWith([BgFashionPath.Home]);
  });

  it('should set currentStep on clicking next', () => {
    const cartTemplate = debugElement.query(By.css('app-cart-template'));
    cartTemplate.triggerEventHandler('nextClicked', null);
    expect(component.currentStep).toEqual(CartStep.DETAILS);
  });

  it('should navigate to product page on clicking product', () => {
    const cartProducts = debugElement.query(By.css('app-cart-products'));
    cartProducts.triggerEventHandler('productClicked', 1);
    expect(router.navigate).toHaveBeenCalledWith([BgFashionPath.Product, 1]);
  });
});
