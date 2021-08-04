import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { EditProductComponent } from './edit-product.component';

describe('EditProductComponent', () => {
  let fixture: ComponentFixture<EditProductComponent>;
  let component: EditProductComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [EditProductComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.editColorWithImages.isFormValid = jasmine.createSpy();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should set error messages on saving without filling the form', () => {
    component.onSave();
    expect(component.errorMessages.title).toEqual('Required');
  });
});
