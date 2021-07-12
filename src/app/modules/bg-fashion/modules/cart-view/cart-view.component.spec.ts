import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CartProduct } from 'src/app/common/interfaces/cart-product';
import { SendEmailResponse } from 'src/app/common/interfaces/send-email';
import { ApiService } from 'src/app/services/api-service/api.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { CartStep, CartViewComponent } from './cart-view.component';

const SEND_EMAIL_RESPONSE: SendEmailResponse = { ok: true, next: '' };

const CART_PRODUCTS: CartProduct[] = [
  {
    product: {
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
    size: 'sm',
    colorWithImages: { color: { name: 'black', hexCode: '#000000' }, images: [] },
    quantity: 1,
  },
];

describe('CartViewComponent', () => {
  let fixture: ComponentFixture<CartViewComponent>;
  let component: CartViewComponent;
  let debugElement: DebugElement;
  let router: Router;
  let cartMock: jasmine.SpyObj<CartService>;
  let apiMock: jasmine.SpyObj<ApiService>;

  beforeEach(async(() => {
    cartMock = jasmine.createSpyObj('CartService', ['getCartProducts', 'removeCartProduct', 'resetCart']);
    apiMock = jasmine.createSpyObj('ApiService', ['sendOrderEmail']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartViewComponent],
      providers: [
        { provide: CartService, useValue: cartMock },
        { provide: ApiService, useValue: apiMock },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartViewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    cartMock.getCartProducts.and.returnValue(CART_PRODUCTS);
    cartMock.removeCartProduct.and.returnValue();
    cartMock.resetCart.and.returnValue();
    apiMock.sendOrderEmail.and.returnValue(of(SEND_EMAIL_RESPONSE));
    component.cartDetailsValues = { name: 'user', phone: '052', email: 'user@gmail.com', address: 'street' };
    fixture.detectChanges();

    spyOn(router, 'navigate');
    spyOn(component.snackbarLabelSubject$, 'next');
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

  it('should show error snackbar on error in sending an email', () => {
    const response: SendEmailResponse = { ok: false, next: '' };
    apiMock.sendOrderEmail.and.returnValue(of(response));

    component.currentStep = CartStep.SUMMARY;
    const cartTemplate = debugElement.query(By.css('app-cart-template'));
    cartTemplate.triggerEventHandler('nextClicked', null);
    fixture.detectChanges();

    expect(component.snackbarLabelSubject$.next).toHaveBeenCalledWith('Oops something went wrong');
  });

  it('should reset cart on sending an email', () => {
    component.currentStep = component.cartStep.SUMMARY;
    const cartTemplate = debugElement.query(By.css('app-cart-template'));
    cartTemplate.triggerEventHandler('nextClicked', null);
    fixture.detectChanges();

    expect(cartMock.resetCart).toHaveBeenCalled();
  });
});
