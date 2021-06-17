import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { IsProductValidGuard } from './is-product-valid.guard';

describe('IsProductValidGuard', () => {
  let guard: IsProductValidGuard;
  let mockRouter: Router;
  const mockRoute: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
  mockRoute.params = { category: 'clothes' };

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
    guard = TestBed.inject(IsProductValidGuard);
  });

  describe('canActivateChild', () => {
    it('should allow navigation', () => {
      guard.canActivateChild(mockRoute).subscribe((value) => {
        expect(value).toBeTruthy();
      });
    });
  });
});
