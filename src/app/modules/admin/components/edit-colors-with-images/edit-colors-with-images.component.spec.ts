import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditColorsWithImagesComponent } from './edit-colors-with-images.component';

describe('EditColorsWithImagesComponent', () => {
  let fixture: ComponentFixture<EditColorsWithImagesComponent>;
  let component: EditColorsWithImagesComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [EditColorsWithImagesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColorsWithImagesComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should get the form values on calling getFormValues()', () => {
    component.colorsWithImages = [{ color: { name: 'red', hexCode: '#f10f29' }, images: ['img1', 'img2'] }];
    component.ngOnInit();
    component.onColorOptionSelect(component.formControls.colors, ['red', 'yellow'], component.formControls.defaultColor);
    component.formControls.yellow1.setValue('yellow image 1');
    component.formControls.yellow2.setValue('yellow image 2');
    component.formControls.defaultColor.setValue(1);

    const colorsWithImages = [
      { color: { name: 'red', hexCode: '#f10f29' }, images: ['img1', 'img2'] },
      { color: { name: 'yellow', hexCode: '#fbe43a' }, images: ['yellow image 1', 'yellow image 2'] },
    ];
    expect(component.getFormValues()).toEqual({ colorsWithImages, defaultColorIndex: 1 });
  });
});
