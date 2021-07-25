import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EditProductsComponent } from './edit-products.component';

const PRODUCT = {
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

describe('EditProductsComponent', () => {
  let fixture: ComponentFixture<EditProductsComponent>;
  let component: EditProductsComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EditProductsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(component.productChanged, 'emit');
    spyOn(component.productAdded, 'emit');
    spyOn(component.productRemoved, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on changing product', () => {
    component.selectedProduct = PRODUCT;
    fixture.detectChanges();

    const editProduct = debugElement.query(By.css('app-edit-product'));
    editProduct.triggerEventHandler('productChanged', PRODUCT);
    expect(component.productChanged.emit).toHaveBeenCalledWith(PRODUCT);
  });

  it('should emit an event on removing product', () => {
    component.selectedProduct = PRODUCT;
    fixture.detectChanges();

    const editProduct = debugElement.query(By.css('app-edit-product'));
    editProduct.triggerEventHandler('productRemoved', null);
    expect(component.productRemoved.emit).toHaveBeenCalledWith(1);
  });

  it('should emit an event on adding product', () => {
    component.isAddProductClicked = true;
    fixture.detectChanges();

    const editProduct = debugElement.query(By.css('app-edit-product'));
    editProduct.triggerEventHandler('productAdded', PRODUCT);
    expect(component.productAdded.emit).toHaveBeenCalledWith(PRODUCT);
  });
});
