import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FavoritesViewComponent } from './favorites-view.component';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';

@NgModule({
  declarations: [FavoritesViewComponent],
  imports: [BrowserModule, RouterModule, CommonModule, CommonComponentsModule],
})
export class FavoritesViewModule {}
