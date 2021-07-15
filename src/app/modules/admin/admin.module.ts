import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin.component';
import { EditHomePageLinkComponent } from './components/edit-home-page-link/edit-home-page-link.component';
import { EditHomePageComponent } from './components/edit-home-page/edit-home-page.component';
import { EditProductsComponent } from './components/edit-products/edit-products.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

@NgModule({
  declarations: [AdminComponent, EditHomePageComponent, EditHomePageLinkComponent, EditProductsComponent, EditProductComponent],
  imports: [BrowserModule, CommonModule, CommonComponentsModule, ReactiveFormsModule],
  exports: [AdminComponent],
})
export class AdminModule {}
