import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAnalyticsEvent } from 'src/app/common/events/analytics-events';
import { Product } from 'src/app/common/interfaces/product';
import { QueryParam } from 'src/app/common/url-params/query-params';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';
import { BgFashionPath } from '../../router/bg-fashion.routes.names';

@Component({
  selector: 'app-favorites-view',
  templateUrl: './favorites-view.component.html',
  styleUrls: ['./favorites-view.component.scss'],
})
export class FavoritesViewComponent implements OnInit {
  favoriteProducts: Product[];

  constructor(@Inject(FIREBASE_TOKEN) private firebaseService, private favoritesService: FavoritesService, private router: Router) {}

  ngOnInit() {
    this.getFavoriteProducts();
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.FavoritesPageInit);
  }

  getFavoriteProducts() {
    this.favoriteProducts = this.favoritesService.getFavoriteProducts();
  }

  onProductClick(event: { productId: number; selectedColorIndex: number }) {
    const queryParams = { [QueryParam.COLOR_INDEX]: event.selectedColorIndex };
    this.router.navigate([BgFashionPath.Product, event.productId], { queryParams });
  }

  onTrashClick(productId: number) {
    this.favoritesService.removeFavoriteProduct(productId);
    this.getFavoriteProducts();
  }
}
