import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { IsExistProductGuard } from './is-exist-product.guard';

describe('IsExistProductGuard', () => {
  let guard: IsExistProductGuard;
  let mockRouter: Router;
  const mockRoute: ActivatedRouteSnapshot = new ActivatedRouteSnapshot();
  mockRoute.params = { id: '1' };

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: mockRouter }],
    }).compileComponents();
    guard = TestBed.inject(IsExistProductGuard);
  });

  describe('canActivate', () => {
    it('should allow navigation', () => {
      guard.canActivate(mockRoute).subscribe((value) => {
        expect(value).toBeTruthy();
      });
    });
  });
});
