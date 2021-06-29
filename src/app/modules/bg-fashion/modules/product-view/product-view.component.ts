import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { PRODUCTS } from '../../common/products';
import { getSizes } from '../../common/utils';
import { ColorWithImages, Product } from '../../interfaces/product';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const fetchDataFromUrl$ = this.route.paramMap.pipe(
      map((paramMap) => {
        const productId = Number(paramMap.get('id'));
        this.product = PRODUCTS.find((product) => product.id === productId);
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
      this.moreProducts = PRODUCTS.filter((product) => {
        if (product.id === this.product.id) {
          return false;
        }

        const isProductIncludesCategory = product.categories.includes(category);
        return subcategory ? isProductIncludesCategory && product.subcategories.includes(subcategory) : isProductIncludesCategory;
      });
      this.moreProducts = this.moreProducts.slice(0, 3);
    }
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
}
