import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from '../../../../common/interfaces/product';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { map, mergeMap } from 'rxjs/operators';
import { Param } from 'src/app/common/url-params/params';
import { QueryParam } from 'src/app/common/url-params/query-params';

const QUERY_PARAM_SEPARATOR = '_';

@Component({
  selector: 'app-products-page-view',
  templateUrl: './products-page-view.component.html',
  styleUrls: ['./products-page-view.component.scss'],
})
export class ProductsPageViewComponent implements OnInit {
  products: Product[] = [];
  category: string;
  subcategory: string;
  colors: string[];
  sizes: string[] | number[];
  categoryOptions: string[];
  subcategoryOptions: string[];
  colorOptions: string[];
  sizeOptions: string[] | number[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const fetchData$ = this.route.queryParamMap.pipe(
      mergeMap((queryParamMap: ParamMap) => {
        this.sizes = queryParamMap.get(QueryParam.SELECTED_SIZES)?.split(QUERY_PARAM_SEPARATOR);
        this.colors = queryParamMap.get(QueryParam.SELECTED_COLORS)?.split(QUERY_PARAM_SEPARATOR);
        return this.route.paramMap;
      }),
      map((paramMap: ParamMap) => {
        this.category = paramMap.get(Param.CATEGORY);
        this.subcategory = paramMap.get(Param.SUBCATEGORY);

        if (this.category) {
          this.products = this.productsService.getProductsByCategories(this.category, this.subcategory, this.colors, this.sizes);
          this.products.forEach((product) => (product.isFavorite = this.favoritesService.isFavoriteProduct(product.id)));
        }
      })
    );

    fetchData$.subscribe(() => {
      this.getFilterBarData();
    });
  }

  getFilterBarData() {
    this.categoryOptions = this.productsService.getCategories();
    this.subcategoryOptions = this.productsService.getSubcategories(this.category);
    this.colorOptions = this.productsService.getColors(this.category, this.subcategory, this.sizes);
    this.sizeOptions = this.productsService.getSizes(this.category, this.subcategory, this.colors);
  }

  getTitle() {
    return this.subcategory || this.category;
  }

  onProductClick(event: { productId: number; selectedColorIndex: number }) {
    const queryParams = { [QueryParam.COLOR_INDEX]: event.selectedColorIndex };
    this.router.navigate([BgFashionPath.Product, event.productId], { relativeTo: this.route, queryParams });
  }

  onHeartClick(event: { productId: number; isFavorite: boolean }) {
    event.isFavorite
      ? this.favoritesService.addFavoriteProduct(event.productId)
      : this.favoritesService.removeFavoriteProduct(event.productId);
  }

  onCategorySelect(value: string) {
    this.router.navigate([BgFashionPath.Category, value]);
  }

  onSubcategorySelect(value: string) {
    this.router.navigate([BgFashionPath.Category, this.category, BgFashionPath.Subcategory, value]);
  }

  onColorSelect(value: string[]) {
    this.changeQueryParam(QueryParam.SELECTED_COLORS, value);
  }

  onSizeSelect(value: string[] | number[]) {
    this.changeQueryParam(QueryParam.SELECTED_SIZES, value);
  }

  private changeQueryParam(queryParam: string, value: string[] | number[]) {
    const queryParamValue = value.length ? value.join(QUERY_PARAM_SEPARATOR) : null;
    const queryParams = { [queryParam]: queryParamValue };
    this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge' });
  }
}
