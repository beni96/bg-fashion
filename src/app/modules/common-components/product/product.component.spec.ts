import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let fixture: ComponentFixture<ProductComponent>;
  let component: ProductComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.colorsWithImages = [
      { color: { name: 'black', hexCode: '#00000' }, images: [] },
      { color: { name: 'red', hexCode: '#912345' }, images: [] },
    ];
    fixture.detectChanges();

    spyOn(component.productClicked, 'emit');
    spyOn(component.heartClicked, 'emit');
    spyOn(component.trashClicked, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set selectedColor to the first one', () => {
    component.defaultColorIndex = 3;
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.selectedColorWithImages).toEqual(component.colorsWithImages[0]);
  });

  it('should emit an event on clicking the product', () => {
    const clickableSection = debugElement.query(By.css('.clickable-section'));
    clickableSection.triggerEventHandler('click', null);
    expect(component.productClicked.emit).toHaveBeenCalledWith(null);

    component.selectedColorWithImages = component.colorsWithImages[1];
    clickableSection.triggerEventHandler('click', null);
    expect(component.productClicked.emit).toHaveBeenCalledWith(1);

    component.defaultColorIndex = 1;
    clickableSection.triggerEventHandler('click', null);
    expect(component.productClicked.emit).toHaveBeenCalledWith(null);
  });

  it('should emit an event on clicking the trash icon', () => {
    component.showTrash = true;
    fixture.detectChanges();

    const trashIcon = debugElement.query(By.css('.fa-trash-alt'));
    trashIcon.triggerEventHandler('click', null);
    expect(component.trashClicked.emit).toHaveBeenCalled();
  });

  it('should emit an event on clicking the heat icon', () => {
    component.showHeart = true;
    fixture.detectChanges();

    const heartIcon = debugElement.query(By.css('.fa-heart'));
    heartIcon.triggerEventHandler('click', null);
    expect(component.heartClicked.emit).toHaveBeenCalledWith(true);
  });
});
