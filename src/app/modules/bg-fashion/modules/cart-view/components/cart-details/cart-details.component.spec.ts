import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CartDetailsComponent } from './cart-details.component';

describe('CartDetailsComponent', () => {
  let fixture: ComponentFixture<CartDetailsComponent>;
  let component: CartDetailsComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [CartDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartDetailsComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should return is form valid and set errorMessages', () => {
    expect(component.validateForm()).toEqual(false);
    expect(component.errorMessages.name).toEqual('Required');
  });

  it('should return fields value', () => {
    component.formControls.name.setValue('user');
    component.formControls.email.setValue('user@gmail.com');
    component.formControls.phone.setValue('052');
    component.formControls.address.setValue('israel');

    expect(component.getCartDetailsValues()).toEqual({ name: 'user', email: 'user@gmail.com', phone: '052', address: 'israel', notes: '' });
  });
});
