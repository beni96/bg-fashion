import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/common/interfaces/product';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { getImgHeight } from '../../common/utils';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';

const COLUMNS_NUM = 4;
const IMAGE_PADDING = 32;

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss'],
})
export class FavoritesViewComponent implements OnInit {
  favoriteProducts: Product[];
  imgHeight: number;

  constructor(private hostElement: ElementRef, private favoritesService: FavoritesService, private router: Router) {}

  ngOnInit() {
    this.favoriteProducts = this.favoritesService.getFavoriteProducts();
    this.getImgHeight();
    window.addEventListener('resize', () => this.getImgHeight());
  }

  getImgHeight() {
    const totalWidth = this.hostElement.nativeElement.offsetWidth;
    const imageRatio = 4 / 3;
    this.imgHeight = getImgHeight(imageRatio, COLUMNS_NUM, totalWidth, IMAGE_PADDING);
  }

  onProductClick(productId: number, selectedColorIndex: number) {
    const queryParams = { color: selectedColorIndex };
    this.router.navigate([BgFashionPath.Product, productId], { queryParams });
  }

  onTrashClick(productId: number) {
    this.favoritesService.removeFavoriteProduct(productId);
  }
}
