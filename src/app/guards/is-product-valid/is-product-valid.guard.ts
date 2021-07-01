import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BgFashionPath } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';
import { ProductsService } from 'src/app/services/products-service/products.service';

@Injectable({
  providedIn: 'root',
})
export class IsProductValidGuard implements CanActivateChild {
  constructor(private router: Router, private productsService: ProductsService) {}

  canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const categoryParam = route.params.category;
    const subcategoryParam = route.params.subcategory;
    const idParam = Number(route.params.id);

    const isValid = this.productsService.getProducts().some((product) => {
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
