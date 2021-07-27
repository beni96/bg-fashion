import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from 'src/app/common/interfaces/product';
import { ProductsComponent } from './products.component';

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

describe('ProductsComponent', () => {
  let fixture: ComponentFixture<ProductsComponent>;
  let component: ProductsComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.products = [PRODUCT_MOCK];
    component.showTrash = true;
    component.showHeart = true;
    fixture.detectChanges();

    spyOn(component.productClicked, 'emit');
    spyOn(component.heartClicked, 'emit');
    spyOn(component.trashClicked, 'emit');
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

  it('should emit an event on clicking the product', () => {
    const product = debugElement.query(By.css('app-product'));
    product.triggerEventHandler('productClicked', 2);
    expect(component.productClicked.emit).toHaveBeenCalledWith({ productId: 1, selectedColorIndex: 2 });
  });

  it('should emit an event on clicking the trash icon', () => {
    const product = debugElement.query(By.css('app-product'));
    product.triggerEventHandler('trashClicked', null);
    expect(component.trashClicked.emit).toHaveBeenCalledWith(1);
  });

  it('should emit an event on clicking the heat icon', () => {
    const product = debugElement.query(By.css('app-product'));
    product.triggerEventHandler('heartClicked', true);
    expect(component.heartClicked.emit).toHaveBeenCalledWith({ productId: 1, isFavorite: true });
  });
});
