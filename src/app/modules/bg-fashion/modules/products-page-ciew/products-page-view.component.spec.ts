import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsPageViewComponent } from './products-page-view.component';

describe('ProductsPageViewComponent', () => {
  let fixture: ComponentFixture<ProductsPageViewComponent>;
  let component: ProductsPageViewComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductsPageViewComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsPageViewComponent);
    component = fixture.componentInstance;
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
});
