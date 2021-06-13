import { Component, OnInit, ViewChild } from '@angular/core';
import { HEADER_CATEGORIES } from '../../common/header-categories';
import { HeaderCategory, HeaderMenuCategories } from '../../interfaces/header-category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isScrolled = false;
  pages: HeaderCategory[] = HEADER_CATEGORIES;
  currentHoveredPage: HeaderCategory;

  ngOnInit() {
    document.addEventListener('scroll', () => {
      return (this.isScrolled = window.pageYOffset > 0);
    });
  }

  onMouseEnter(page: HeaderCategory) {
    this.currentHoveredPage = page;
  }

  onMouseLeave() {
    this.currentHoveredPage = null;
  }
}
