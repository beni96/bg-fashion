import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { getImgHeight } from '../../../../common/utils/utils';
import { Product } from '../../../../common/interfaces/product';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';
import { ProductsService } from 'src/app/services/products-service/products.service';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';

const COLUMNS_NUM = 4;
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

  constructor(
    private hostElement: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private favoritesService: FavoritesService
  ) {}

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
        this.products = this.productsService.getProductsByCategories(this.category, this.subcategory);
      }
    });
  }

  getImgHeight() {
    const totalWidth = this.hostElement.nativeElement.offsetWidth;
    const imageRatio = 4 / 3;
    this.imgHeight = getImgHeight(imageRatio, COLUMNS_NUM, totalWidth, IMAGE_PADDING);
  }

  getTitle() {
    return this.subcategory || this.category;
  }

  onProductClick(productId: number, selectedColorIndex: number) {
    const queryParams = { color: selectedColorIndex };
    this.router.navigate([BgFashionPath.Product, productId], { relativeTo: this.route, queryParams });
  }

  onHeartClick(product: Product, isFavorite: boolean) {
    isFavorite ? this.favoritesService.addFavoriteProduct(product.id) : this.favoritesService.removeFavoriteProduct(product.id);
  }

  isFavorite(productId: number) {
    return this.favoritesService.isFavoriteProduct(productId);
  }
}
