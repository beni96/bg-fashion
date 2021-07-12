import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [BrowserModule, CommonModule, CommonComponentsModule],
  exports: [PageNotFoundComponent],
})
export class PageNotFoundModule {}
