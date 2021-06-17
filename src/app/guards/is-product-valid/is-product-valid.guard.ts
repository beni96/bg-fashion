import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PRODUCTS } from 'src/app/modules/bg-fashion/common/products';
import { BgFashionPath } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';

@Injectable({
  providedIn: 'root',
})
export class IsProductValidGuard implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const categoryParam = route.params.category;
    const subcategoryParam = route.params.subcategory;
    const idParam = Number(route.params.id);

    const isValid = PRODUCTS.some((product) => {
      const isIdValid = idParam ? product.id === idParam : true;
      const isCategoryValid = categoryParam ? product.categories.some((category) => category === categoryParam) : true;
      const isSubcategoryValid = subcategoryParam ? product.subcategories.some((subcategory) => subcategory === subcategoryParam) : true;
      return isIdValid && isCategoryValid && isSubcategoryValid;
    });

    return isValid ? of(true) : this.redirectToErrorPage();
  }

  private redirectToErrorPage() {
    this.router.navigate([BgFashionPath.Error]);
    return of(false);
  }
}
