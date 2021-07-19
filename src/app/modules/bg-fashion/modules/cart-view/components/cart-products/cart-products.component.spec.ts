import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CartProductExtended } from 'src/app/common/interfaces/cart-product';
import { CartProductsComponent } from './cart-products.component';

const CART_PRODUCTS: CartProductExtended[] = [
  {
    product: {
      id: 1,
      title: 'Sneakers',
      subtitle: 'Brand new sneakers',
      price: 20,
      sizes: [38, 39, 40],
      colorsWithImages: [{ color: { name: 'black', hexCode: '#000000' }, images: [] }],
      categories: ['shoes'],
      subcategories: ['sneakers'],
    },
    colorWithImages: { color: { name: 'black', hexCode: '#000000' }, images: [] },
    size: 'sm',
    quantity: 3,
  },
];

describe('CartProductsComponent', () => {
  let fixture: ComponentFixture<CartProductsComponent>;
  let component: CartProductsComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartProductsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartProductsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.cartProducts = CART_PRODUCTS;
    fixture.detectChanges();

    spyOn(component.productClicked, 'emit');
    spyOn(component.trashClicked, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on clicking product', () => {
    const cartProduct = debugElement.queryAll(By.css('.cart-product'))[0];
    cartProduct.triggerEventHandler('click', null);
    expect(component.productClicked.emit).toHaveBeenCalledWith(1);
  });

  it('should emit an event on clicking trash', () => {
    const trashIcon = debugElement.queryAll(By.css('.fa-trash-alt'))[0];
    trashIcon.triggerEventHandler('click', null);
    expect(component.trashClicked.emit).toHaveBeenCalledWith(1);
  });

  it('should calculate the total price', () => {
    expect(component.getTotalPrice()).toEqual(60);
  });
});
