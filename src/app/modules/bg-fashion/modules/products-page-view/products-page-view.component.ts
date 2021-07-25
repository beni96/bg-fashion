import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { getImgHeight } from '../../../../common/utils/utils';
import { Product } from '../../../../common/interfaces/product';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { map, mergeMap } from 'rxjs/operators';
import { Param } from 'src/app/common/url-params/params';
import { QueryParam } from 'src/app/common/url-params/query-params';

const COLUMNS_NUM = 4;
const IMAGE_PADDING = 32;
const QUERY_PARAM_SEPARATOR = '_';

@Component({
  selector: 'app-products-page-view',
  templateUrl: './products-page-view.component.html',
  styleUrls: ['./products-page-view.component.scss'],
})
export class ProductsPageViewComponent implements OnInit {
  products: Product[] = [];
  imgHeight: number;
  category: string;
  subcategory: string;
  colors: string[];
  sizes: string[] | number[];
  categoryOptions: string[];
  subcategoryOptions: string[];
  colorOptions: string[];
  sizeOptions: string[] | number[];

  constructor(
    private hostElement: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    this.fetchData();
    this.getImgHeight();
    window.addEventListener('resize', () => this.getImgHeight());
  }

  fetchData() {
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
        }
      })
    );

    fetchData$.subscribe(() => {
      this.getFilterBarData();
    });
  }

  getImgHeight() {
    const totalWidth = this.hostElement.nativeElement.offsetWidth;
    const imageRatio = 4 / 3;
    this.imgHeight = getImgHeight(imageRatio, COLUMNS_NUM, totalWidth, IMAGE_PADDING);
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

  onProductClick(productId: number, selectedColorIndex: number) {
    const queryParams = { [QueryParam.COLOR_INDEX]: selectedColorIndex };
    this.router.navigate([BgFashionPath.Product, productId], { relativeTo: this.route, queryParams });
  }

  onHeartClick(product: Product, isFavorite: boolean) {
    isFavorite ? this.favoritesService.addFavoriteProduct(product.id) : this.favoritesService.removeFavoriteProduct(product.id);
  }

  isFavorite(productId: number) {
    return this.favoritesService.isFavoriteProduct(productId);
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
