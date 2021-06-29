import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { QuantityComponent } from './quantity.component';

describe('QuantityComponent', () => {
  let fixture: ComponentFixture<QuantityComponent>;
  let component: QuantityComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [QuantityComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    component.quantity = 1;
    fixture.detectChanges();

    spyOn(component.quantityChanged, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on changing the quantity', () => {
    const plusIcon = debugElement.queryAll(By.css('.icon'))[1];
    plusIcon.triggerEventHandler('click', null);
    expect(component.quantityChanged.emit).toHaveBeenCalledWith(2);
  });
});
