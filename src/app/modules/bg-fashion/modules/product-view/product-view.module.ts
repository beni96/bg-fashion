import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductViewComponent } from './product-view.component';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { SizeComponent } from './components/size/size.component';
import { QuantityComponent } from './components/quantity/quantity.component';

@NgModule({
  declarations: [ProductViewComponent, SizeComponent, QuantityComponent],
  imports: [BrowserModule, CommonModule, CommonComponentsModule],
})
export class ProductViewModule {}
