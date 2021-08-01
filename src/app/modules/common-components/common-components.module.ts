import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorComponent } from './color/color.component';
import { PriceComponent } from './price/price.component';
import { ButtonComponent } from './button/button.component';
import { ProductComponent } from './products/product/product.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { StateMessageComponent } from './state-message/state-message.component';
import { SelectComponent } from './select/select.component';
import { ProductsComponent } from './products/products.component';
import { SizeComponent } from './size/size.component';

const components = [
  ButtonComponent,
  ColorComponent,
  PriceComponent,
  ProductComponent,
  ProductsComponent,
  SelectComponent,
  SizeComponent,
  SnackbarComponent,
  StateMessageComponent,
  TextFieldComponent,
];

@NgModule({
  declarations: components,
  imports: [BrowserModule, CommonModule],
  exports: components,
})
export class CommonComponentsModule {}
