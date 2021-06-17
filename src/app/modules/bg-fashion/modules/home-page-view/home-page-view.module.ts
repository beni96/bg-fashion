import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HomePageViewComponent } from './home-page-view.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HomePageViewComponent],
  imports: [BrowserModule, RouterModule, CommonModule],
})
export class HomePageViewModule {}
