import { Component, Input, OnInit } from '@angular/core';
import { BgFashionPath } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  @Input() category: string;
  @Input() subcategory: string;

  links: { title: string; url: string }[] = [];

  ngOnInit() {
    this.links = this.subcategory
      ? [
          { title: 'Home', url: '/' },
          { title: this.category, url: `/${BgFashionPath.Category}/${this.category}` },
        ]
      : [{ title: 'Home', url: '/' }];
  }
}
