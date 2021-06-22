import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let fixture: ComponentFixture<ProductComponent>;
  let component: ProductComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedColor to the first one', () => {
    component.colorsWithImages = [{ color: { name: 'black', hexCode: '#00000' }, images: [] }];
    component.defaultColorIndex = 3;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.selectedColorWithImages).toEqual(component.colorsWithImages[0]);
  });
});
