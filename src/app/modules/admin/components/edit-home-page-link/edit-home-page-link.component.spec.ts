import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { EditHomePageLinkComponent } from './edit-home-page-link.component';

describe('EditHomePageLinkComponent', () => {
  let fixture: ComponentFixture<EditHomePageLinkComponent>;
  let component: EditHomePageLinkComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [EditHomePageLinkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomePageLinkComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(component.categoryLinkChanged, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the values on save', () => {
    component.formControls.url.setValue('image');
    component.formControls.title.setValue('title');
    component.formControls.category.setValue('category');
    component.formControls.subcategory.setValue('subcategory');
    fixture.detectChanges();

    component.onSave();

    expect(component.categoryLinkChanged.emit).toHaveBeenCalledWith({
      imageUrl: 'image',
      title: 'title',
      category: 'category',
      subcategory: 'subcategory',
    });
  });
});
