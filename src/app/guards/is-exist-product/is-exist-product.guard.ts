import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PRODUCTS } from 'src/app/modules/bg-fashion/common/products';
import { BgFashionPath } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';

@Injectable({
  providedIn: 'root',
})
export class IsExistProductGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const id = Number(route.params.id);
    const isProductExist = PRODUCTS.find((product) => product.id === id);
    return isProductExist ? of(true) : this.redirectToMainApp();
  }

  private redirectToMainApp() {
    this.router.navigate([BgFashionPath.Error]);
    return of(false);
  }
}
