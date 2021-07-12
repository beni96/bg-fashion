import { DebugElement } from '@angular/core';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BgFashionPath } from '../../bg-fashion/router/bg-fashion.routes.names';
import { StateMessageComponent } from './state-message.component';

describe('StateMessageComponent', () => {
  let fixture: ComponentFixture<StateMessageComponent>;
  let component: StateMessageComponent;
  let debugElement: DebugElement;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [StateMessageComponent],
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateMessageComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    spyOn(router, 'navigate');
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate home on clicking home button', () => {
    const button = debugElement.query(By.css('app-button'));
    button.triggerEventHandler('click', null);
    expect(router.navigate).toHaveBeenCalledWith([BgFashionPath.Home]);
  });
});
