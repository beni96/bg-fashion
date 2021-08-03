import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Color, Product } from '../../../../common/interfaces/product';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { map, mergeMap } from 'rxjs/operators';
import { Param } from 'src/app/common/url-params/params';
import { QueryParam } from 'src/app/common/url-params/query-params';
import { FilterBarDialogComponent } from './components/filter-bar-dilaog/filter-bar-dialog.component';
import { GoogleAnalyticsEvent } from 'src/app/common/events/analytics-events';
import firebase from 'firebase/app';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';

const QUERY_PARAM_SEPARATOR = '_';
const MOBILE_LAYOUT_MAX_WIDTH = 600;

@Component({
  selector: 'app-products-page-view',
  templateUrl: './products-page-view.component.html',
  styleUrls: ['./products-page-view.component.scss'],
})
export class ProductsPageViewComponent implements OnInit, AfterViewInit {
  products: Product[] = [];
  category: string;
  subcategory: string;
  colors: string[];
  sizes: any[];
  categoryOptions: string[];
  subcategoryOptions: string[];
  colorOptions: Color[];
  colorNameOptions: string[];
  sizeOptions: string[] | number[];
  isMobile = false;

  @ViewChild('filterBarDialog') filterBarDialog: FilterBarDialogComponent;

  constructor(
    @Inject(FIREBASE_TOKEN) private firebaseService,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    const fetchData$ = this.route.queryParamMap.pipe(
      mergeMap((queryParamMap: ParamMap) => {
        this.sizes = queryParamMap
          .get(QueryParam.SELECTED_SIZES)
          ?.split(QUERY_PARAM_SEPARATOR)
          .map((size) => (isNaN(Number(size)) ? size : Number(size)));
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
      this.getFilterBarData(this.category, this.subcategory, this.colors, this.sizes);
      this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.ProductsPageInit);
    });
  }

  ngAfterViewInit() {
    this.isMobile = this.isMobileLayout();
    window.addEventListener('resize', () => {
      return (this.isMobile = this.isMobileLayout());
    });
  }

  isMobileLayout() {
    return document.body.clientWidth <= MOBILE_LAYOUT_MAX_WIDTH;
  }

  getFilterBarData(category: string, subcategory: string, colors: string[], sizes: string[] | number[]) {
    this.categoryOptions = this.productsService.getCategories();
    this.subcategoryOptions = this.productsService.getSubcategories(category);
    this.colorOptions = this.productsService.getColors(category, subcategory, sizes);
    this.colorNameOptions = this.colorOptions.map((colorOption) => colorOption.name);
    this.sizeOptions = this.productsService.getSizes(category, subcategory, colors);
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

  showFilterBarDialog() {
    this.filterBarDialog.showDialog();
  }

  onFilterDialogFieldChange(event: { category: string; subcategory: string; colors: string[]; sizes: string[] | number[] }) {
    this.getFilterBarData(event.category, event.subcategory, event.colors, event.sizes);
  }

  onFilterDialogFinish(event: { category: string; subcategory: string; colors: string[]; sizes: string[] | number[] }) {
    const subcategoryPrefix = event.subcategory ? [BgFashionPath.Subcategory, event.subcategory] : '';
    const path = subcategoryPrefix
      ? [BgFashionPath.Category, event.category, ...subcategoryPrefix]
      : [BgFashionPath.Category, event.category];
    const colorQueryParams = this.getQueryParams(QueryParam.SELECTED_COLORS, event.colors);
    const sizeQueryParams = this.getQueryParams(QueryParam.SELECTED_SIZES, event.sizes);
    this.router.navigate(path, { queryParams: { ...colorQueryParams, ...sizeQueryParams }, queryParamsHandling: 'merge' });
  }

  private changeQueryParam(queryParam: string, value: string[] | number[]) {
    const queryParams = this.getQueryParams(queryParam, value);
    this.router.navigate([], { relativeTo: this.route, queryParams, queryParamsHandling: 'merge' });
  }

  private getQueryParams(queryParam: string, value: string[] | number[]) {
    const queryParamValue = value.length ? value.join(QUERY_PARAM_SEPARATOR) : null;
    return { [queryParam]: queryParamValue };
  }
}
