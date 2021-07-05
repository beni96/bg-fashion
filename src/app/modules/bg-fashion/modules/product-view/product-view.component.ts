import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { getImgHeight, getSizes } from '../../common/utils';
import { ColorWithImages, Product } from '../../../../common/interfaces/product';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { CartService } from 'src/app/services/cart-service/cart.service';
import { CartProduct } from 'src/app/common/interfaces/cart-product';

const COLUMNS_NUM = 2;
const IMAGE_PADDING = 8;

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
  imgHeight: number;
  shouldShowSizeError = false;

  @ViewChild('content') content: ElementRef;

  constructor(
    private host: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private favoritesService: FavoritesService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const fetchDataFromUrl$ = this.route.paramMap.pipe(
      map((paramMap) => {
        const productId = Number(paramMap.get('id'));
        this.product = this.productsService.getProductById(productId);
        this.getMoreProducts(paramMap);
      }),
      mergeMap(() => this.getSelectedColor())
    );

    fetchDataFromUrl$.subscribe(() => {});
    this.sizes = getSizes(this.product.sizesType);
    window.addEventListener('resize', () => this.getImgHeight());

    setTimeout(() => this.getImgHeight(), 0);
  }

  getSelectedColor() {
    return this.route.queryParamMap.pipe(
      map((queryParamMap) => {
        const colorIndex = queryParamMap.get('color');
        const defaultColorIndex = this.product.defaultColorIndex || 0;
        this.selectedColor = colorIndex ? this.product.colorsWithImages[colorIndex] : this.product.colorsWithImages[defaultColorIndex];
      })
    );
  }

  getMoreProducts(paramMap: ParamMap) {
    const category = paramMap.get('category');
    const subcategory = paramMap.get('subcategory');

    if (category) {
      this.moreProducts = this.productsService.getProductsByCategories(category, subcategory, this.product.id);
      this.moreProducts = this.moreProducts.slice(0, 3);
    }
  }

  getImgHeight() {
    const totalWidth = this.host.nativeElement.offsetWidth - this.content.nativeElement.offsetWidth;
    const imageRatio = 4 / 3;
    this.imgHeight = getImgHeight(imageRatio, COLUMNS_NUM, totalWidth, IMAGE_PADDING);
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

  onProductClick(productId: number, selectedColorIndex: number) {
    const queryParams = { color: selectedColorIndex };
    this.router.navigate([`../${productId}`], { relativeTo: this.route, queryParams });
  }

  onAddToCartClick() {
    if (this.product.sizes?.length && !this.selectedSize) {
      this.shouldShowSizeError = true;
      return;
    }
    const colorIndex = this.product.colorsWithImages.indexOf(this.selectedColor);
    const cartProduct: CartProduct = { product: this.product, colorIndex, size: this.selectedSize, quantity: this.quantity };
    this.cartService.addCartProduct(cartProduct);
  }

  onMarkAsFavoriteClick() {
    this.favoritesService.addFavoriteProduct(this.product);
  }
}
