import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductsPageViewComponent } from './products-page-view.component';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { FilterBarComponent } from './components/filter-bar/filter-bar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
  declarations: [ProductsPageViewComponent, FilterBarComponent, BreadcrumbsComponent],
  imports: [BrowserModule, CommonModule, RouterModule, CommonComponentsModule],
})
export class ProductsPageViewModule {}
