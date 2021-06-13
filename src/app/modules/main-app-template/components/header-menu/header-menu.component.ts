import { Component, Input } from '@angular/core';
import { HeaderMenuCategories } from '../../interfaces/header-category';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent {
  @Input() categories: HeaderMenuCategories[];
  @Input() imageUrl: string;
}
