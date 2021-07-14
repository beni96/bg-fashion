import { Component, OnInit } from '@angular/core';
import { CategoryLink } from 'src/app/common/interfaces/category-link';
import { HomePageService } from 'src/app/services/home-page-service/home-page.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
})
export class AdminViewComponent implements OnInit {
  categoryLinks: CategoryLink[] = [];

  constructor(private homePageService: HomePageService) {}

  ngOnInit() {
    this.getCategoryLinks();
  }

  onCategoryLinkChange(event: { categoryLink: CategoryLink; index: number }) {
    this.homePageService.setCategoryLink(event.categoryLink, event.index);
    this.getCategoryLinks();
  }

  getCategoryLinks() {
    this.categoryLinks = this.homePageService.getCategoryLinks();
  }
}
