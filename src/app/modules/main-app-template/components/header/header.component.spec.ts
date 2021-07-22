import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PRODUCTS } from 'src/app/common/products/products';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let debugElement: DebugElement;
  let productsServiceMock: jasmine.SpyObj<ProductsService>;

  beforeEach(async(() => {
    productsServiceMock = jasmine.createSpyObj('ProductsService', ['getCategoriesSubject', 'getSubcategories']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [{ provide: ProductsService, useValue: productsServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    productsServiceMock.getCategoriesSubject.and.returnValue(of(['shoes', 'clothes', 'sale']));
    productsServiceMock.getSubcategories.and.returnValue(['jeans', 'dresses']);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should show menu on hovering category element', () => {
    const category = debugElement.queryAll(By.css('.page'))[0];
    category.triggerEventHandler('mouseenter', null);
    expect(component.currentHoveredPage).toEqual(component.pages[0]);

    const menu = debugElement.query(By.css('app-header-menu'));
    expect(menu).toBeDefined();
  });

  it('should hide menu on leaving the header categories element', () => {
    const category = debugElement.queryAll(By.css('.page'))[0];
    category.triggerEventHandler('mouseenter', null);
    const headerCategories = debugElement.query(By.css('.pages-wrapper'));
    headerCategories.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();

    expect(component.currentHoveredPage).toEqual(null);
    const menu = debugElement.query(By.css('app-header-menu'));
    expect(menu).toBe(null);
  });

  it('should set pages with the categories and subcategories', () => {
    expect(component.pages.length).toBeTruthy();
    expect(component.pages[0].menuCategories.length).toBeTruthy();

    const subcategory = PRODUCTS[0].subcategories[0];
    expect(subcategory).toBeTruthy();
  });
});
