import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminViewModule } from './modules/admin-view/admin-view.module';

@NgModule({
  imports: [BrowserModule, CommonModule, AdminViewModule],
})
export class AdminModule {}
