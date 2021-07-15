import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryLink } from 'src/app/common/interfaces/category-link';

@Component({
  selector: 'app-edit-home-page',
  templateUrl: './edit-home-page.component.html',
  styleUrls: ['./edit-home-page.component.scss'],
})
export class EditHomePageComponent {
  @Input() categoryLinks: CategoryLink[] = [];
  @Output() categoryLinkChanged = new EventEmitter<{ categoryLink: CategoryLink; index: number }>();

  selectedCategoryLinkIndex: number;
  selectedCategoryLink: CategoryLink;

  getSelectOptions() {
    return this.categoryLinks.map((categoryLink) => categoryLink.title);
  }

  onSelect(option: string) {
    this.selectedCategoryLinkIndex = this.categoryLinks.findIndex((categoryLink) => option === categoryLink.title);
    this.selectedCategoryLink = this.categoryLinks[this.selectedCategoryLinkIndex];
  }

  onCategoryLinkChange(categoryLink: CategoryLink) {
    this.categoryLinkChanged.emit({ categoryLink, index: this.selectedCategoryLinkIndex });
    this.selectedCategoryLink = null;
    this.selectedCategoryLinkIndex = null;
  }
}
