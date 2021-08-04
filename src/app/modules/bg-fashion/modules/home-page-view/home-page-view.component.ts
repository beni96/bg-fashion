import { Component, Inject, OnInit } from '@angular/core';
import { GoogleAnalyticsEvent } from 'src/app/common/events/analytics-events';
import { CategoryLink } from 'src/app/common/interfaces/category-link';
import { HomePageService } from 'src/app/services/home-page-service/home-page.service';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';
import { BgFashionPath, BG_FASHION_PREFIX } from '../../router/bg-fashion.routes.names';

@Component({
  selector: 'app-home-page-view',
  templateUrl: './home-page-view.component.html',
  styleUrls: ['./home-page-view.component.scss'],
})
export class HomePageViewComponent implements OnInit {
  homeImage: CategoryLink;
  categories: CategoryLink[] = [];
  moreCategories: CategoryLink[] = [];

  constructor(@Inject(FIREBASE_TOKEN) private firebaseService, private homePageService: HomePageService) {}

  ngOnInit() {
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.HomeImageChanged);
    const categoryLinks = this.homePageService.getCategoryLinks();
    this.homeImage = categoryLinks[0];
    this.categories = categoryLinks.slice(1, 5);
    this.moreCategories = categoryLinks.slice(5, 7);
  }

  getLink(categoryImageLink: CategoryLink) {
    const linkSuffix = categoryImageLink.subcategory ? `/${BgFashionPath.Subcategory}/${categoryImageLink.subcategory}` : '';
    return `${BG_FASHION_PREFIX}/${BgFashionPath.Category}/${categoryImageLink.category}` + linkSuffix;
  }
}
