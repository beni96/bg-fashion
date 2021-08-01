import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterBarDialogComponent } from './filter-bar-dialog.component';

describe('FilterBarDialogComponent', () => {
  let fixture: ComponentFixture<FilterBarDialogComponent>;
  let component: FilterBarDialogComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [FilterBarDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterBarDialogComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(component.filterFinished, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit dialog values on clicking done', () => {
    component.isOpen = true;
    component.sizeOptions = ['sm'];

    component.selectedCategory = 'clothes';
    component.selectedSubcategory = 'jeans';
    component.selectedColors = ['red'];
    component.selectedSizes = ['sm'];

    fixture.detectChanges();

    const doneButton = debugElement.query(By.css('app-button'));
    doneButton.triggerEventHandler('click', null);

    expect(component.filterFinished.emit).toHaveBeenCalledWith({
      category: 'clothes',
      subcategory: 'jeans',
      colors: ['red'],
      sizes: ['sm'],
    });
  });
});
