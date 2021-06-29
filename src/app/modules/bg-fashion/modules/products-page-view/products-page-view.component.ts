import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PRODUCTS } from '../../common/products';
import { Product } from '../../interfaces/product';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';

const IMAGES_NUM_IN_ROW = 4;
const IMAGE_PADDING = 32;

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

  constructor(private hostElement: ElementRef, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.getProducts();
    this.getImgHeight();
    window.addEventListener('resize', () => this.getImgHeight());
  }

  getProducts() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.category = paramMap.get('category');
      this.subcategory = paramMap.get('subcategory');

      if (this.category) {
        this.products = PRODUCTS.filter((product) => {
          const isProductIncludesCategory = product.categories.includes(this.category);
          return this.subcategory
            ? isProductIncludesCategory && product.subcategories.includes(this.subcategory)
            : isProductIncludesCategory;
        });
      }
    });
  }

  getImgHeight() {
    const totalWidth = this.hostElement.nativeElement.offsetWidth;
    const imageWidth = totalWidth / IMAGES_NUM_IN_ROW - IMAGE_PADDING;
    const imageRatio = 4 / 3;
    this.imgHeight = imageWidth * imageRatio;
  }

  getTitle() {
    return this.subcategory || this.category;
  }

  onProductClick(productId: number, selectedColorIndex: number) {
    const queryParams = { color: selectedColorIndex };
    this.router.navigate([BgFashionPath.Product, productId], { relativeTo: this.route, queryParams });
  }
}
