import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { getSizes } from '../../../../common/utils/utils';
import { ColorWithImages, Product } from '../../../../common/interfaces/product';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { CartProduct } from 'src/app/common/interfaces/cart-product';
import { Subject } from 'rxjs';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { Param } from 'src/app/common/url-params/params';
import { QueryParam } from 'src/app/common/url-params/query-params';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent implements OnInit {
  product: Product;
  quantity = 1;
  selectedColor: ColorWithImages;
  selectedSize: string | number;
  moreProducts: Product[] = [];
  sizes: string[] | number[];
  category: string;
  subcategory: string;
  shouldShowSizeError = false;
  snackbarLabelSubject$ = new Subject<string>();

  @ViewChild('content') content: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const fetchDataFromUrl$ = this.route.paramMap.pipe(
      map((paramMap) => {
        const productId = Number(paramMap.get(Param.PRODUCT_ID));
        this.product = this.productsService.getProductById(productId);
        this.getMoreProducts(paramMap);
      }),
      mergeMap(() => this.getSelectedColor())
    );

    fetchDataFromUrl$.subscribe(() => {});
    this.sizes = getSizes(this.product.sizesType);
  }

  getSelectedColor() {
    return this.route.queryParamMap.pipe(
      map((queryParamMap) => {
        const colorIndex = queryParamMap.get(QueryParam.COLOR_INDEX);
        const defaultColorIndex = this.product.defaultColorIndex || 0;
        this.selectedColor = colorIndex ? this.product.colorsWithImages[colorIndex] : this.product.colorsWithImages[defaultColorIndex];
      })
    );
  }

  getMoreProducts(paramMap: ParamMap) {
    this.category = paramMap.get(Param.CATEGORY);
    this.subcategory = paramMap.get(Param.SUBCATEGORY);

    if (this.category) {
      this.moreProducts = this.productsService.getProductsByCategories(this.category, this.subcategory, null, null, this.product.id);
      this.moreProducts = this.moreProducts.slice(0, 3);
    }
  }

  getBackLink() {
    const categoryPath = [`/${BgFashionPath.Category}`, this.category];
    return this.subcategory ? [...categoryPath, BgFashionPath.Subcategory, this.subcategory] : categoryPath;
  }

  isSelectedColor(colorWithImages: ColorWithImages) {
    return colorWithImages.color.hexCode === this.selectedColor.color.hexCode;
  }

  isSelectedSize(size: string | number) {
    return size === this.selectedSize;
  }

  isDisabledSize(size: string | number) {
    return !this.product.sizes.some((productSize) => productSize === size);
  }

  onColorSelect(colorWithImages: ColorWithImages) {
    this.selectedColor = colorWithImages;
  }

  onSizeSelect(size: string) {
    this.shouldShowSizeError = false;
    this.selectedSize = size;
  }

  onQuantityChange(quantity: number) {
    this.quantity = quantity;
  }

  getDiscount() {
    return (((this.product.previousPrice - this.product.price) * 100) / this.product.previousPrice).toFixed();
  }

  onProductClick(event: { productId: number; selectedColorIndex: number }) {
    const queryParams = { [QueryParam.COLOR_INDEX]: event.selectedColorIndex };
    this.router.navigate([`../${event.productId}`], { relativeTo: this.route, queryParams });
  }

  onAddToCartClick() {
    if (this.product.sizes?.length && !this.selectedSize) {
      this.shouldShowSizeError = true;
      return;
    }
    const cartProduct: CartProduct = {
      productId: this.product.id,
      colorName: this.selectedColor.color.name,
      size: this.selectedSize,
      quantity: this.quantity,
    };
    this.cartService.addCartProduct(cartProduct);
    this.snackbarLabelSubject$.next('Item was added to cart');
  }

  onMarkAsFavoriteClick() {
    this.favoritesService.addFavoriteProduct(this.product.id);
    this.snackbarLabelSubject$.next('Item was added to favorites');
  }
}
