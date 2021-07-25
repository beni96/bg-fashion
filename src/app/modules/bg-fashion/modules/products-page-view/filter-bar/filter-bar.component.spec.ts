import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FilterBarComponent } from './filter-bar.component';

describe('FilterBarComponent', () => {
  let fixture: ComponentFixture<FilterBarComponent>;
  let component: FilterBarComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBarComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.sizeOptions = ['sm', 'md'];
    fixture.detectChanges();

    spyOn(component.categorySelected, 'emit');
    spyOn(component.subcategorySelected, 'emit');
    spyOn(component.colorSelected, 'emit');
    spyOn(component.sizeSelected, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on selecting category', () => {
    component.categoryOptions = ['category1', 'category2'];
    const categorySelect = debugElement.queryAll(By.css('app-select'))[0];
    categorySelect.triggerEventHandler('optionSelected', 'category1');
    expect(component.categorySelected.emit).toHaveBeenCalledWith('category1');
  });

  it('should emit an event on selecting subcategory', () => {
    component.subcategoryOptions = ['subcategory1', 'subcategory2'];
    const subcategorySelect = debugElement.queryAll(By.css('app-select'))[1];
    subcategorySelect.triggerEventHandler('optionSelected', 'subcategory1');
    expect(component.subcategorySelected.emit).toHaveBeenCalledWith('subcategory1');
  });

  it('should emit an event on selecting colors', () => {
    component.colorOptions = ['color1', 'color2'];
    const colorSelect = debugElement.queryAll(By.css('app-select'))[2];
    colorSelect.triggerEventHandler('optionSelected', ['color1', 'color2']);
    expect(component.colorSelected.emit).toHaveBeenCalledWith(['color1', 'color2']);
  });

  it('should emit an event on selecting sizes', () => {
    component.sizeOptions = ['size1', 'size2'];
    const sizeSelect = debugElement.queryAll(By.css('app-select'))[3];
    sizeSelect.triggerEventHandler('optionSelected', ['size1', 'size2']);
    expect(component.sizeSelected.emit).toHaveBeenCalledWith(['size1', 'size2']);
  });
});
