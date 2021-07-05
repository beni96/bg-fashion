import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CartStep } from '../../cart-view.component';
import { CartTemplateComponent } from './cart-template.component';

describe('CartTemplateComponent', () => {
  let fixture: ComponentFixture<CartTemplateComponent>;
  let component: CartTemplateComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CartTemplateComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTemplateComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.currentStep = CartStep.DETAILS;
    fixture.detectChanges();

    spyOn(component.cancelClicked, 'emit');
    spyOn(component.backClicked, 'emit');
    spyOn(component.nextClicked, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on clicking cancel', () => {
    const cancelButton = debugElement.queryAll(By.css('app-button'))[0];
    cancelButton.triggerEventHandler('click', null);
    expect(component.cancelClicked.emit).toHaveBeenCalled();
  });

  it('should emit an event on clicking back', () => {
    const backButton = debugElement.queryAll(By.css('app-button'))[1];
    backButton.triggerEventHandler('click', null);
    expect(component.backClicked.emit).toHaveBeenCalled();
  });

  it('should emit an event on clicking next', () => {
    const nextButton = debugElement.queryAll(By.css('app-button'))[2];
    nextButton.triggerEventHandler('click', null);
    expect(component.nextClicked.emit).toHaveBeenCalled();
  });
});
