import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { ProductsPageViewComponent } from './products-page-view.component';

describe('ProductsPageViewComponent', () => {
  let fixture: ComponentFixture<ProductsPageViewComponent>;
  let component: ProductsPageViewComponent;
  let debugElement: DebugElement;
  let router: Router;
  const paramMap = convertToParamMap({ category: 'clothes' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductsPageViewComponent],
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(paramMap) } }],
    }).compileComponents();

    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPageViewComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
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
    expect(router.navigate).toHaveBeenCalledWith([BgFashionPath.Product, component.products[0].id], {
      // @ts-ignore
      relativeTo: component.route,
      queryParams: { color: 2 },
    });
  });
});
