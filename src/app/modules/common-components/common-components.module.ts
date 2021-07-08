import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorComponent } from './color/color.component';
import { PriceComponent } from './price/price.component';
import { ButtonComponent } from './button/button.component';
import { ProductComponent } from './product/product.component';
import { TextFieldComponent } from './text-field/text-field.component';

const components = [ColorComponent, PriceComponent, ButtonComponent, ProductComponent, TextFieldComponent];

@NgModule({
  declarations: components,
  imports: [BrowserModule, CommonModule],
  exports: components,
})
export class CommonComponentsModule {}
