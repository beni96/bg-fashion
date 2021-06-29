import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ColorComponent } from './color.component';

describe('ColorComponent', () => {
  let fixture: ComponentFixture<ColorComponent>;
  let component: ColorComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ColorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(component.colorSelected, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on changing the quantity', () => {
    const color = debugElement.query(By.css('.color-wrapper'));
    color.triggerEventHandler('click', null);
    expect(component.colorSelected.emit).toHaveBeenCalled();
  });
});
