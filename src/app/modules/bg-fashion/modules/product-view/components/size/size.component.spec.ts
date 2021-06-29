import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SizeComponent } from './size.component';

describe('SizeComponent', () => {
  let fixture: ComponentFixture<SizeComponent>;
  let component: SizeComponent;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SizeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(component.sizeSelected, 'emit');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on changing the quantity', () => {
    const size = debugElement.query(By.css('.size-wrapper'));
    size.triggerEventHandler('click', null);
    expect(component.sizeSelected.emit).toHaveBeenCalled();
  });
});
