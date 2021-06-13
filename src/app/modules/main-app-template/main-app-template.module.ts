import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppTemplateComponent } from './main-app-template.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [MainAppTemplateComponent, HeaderComponent],
  imports: [BrowserModule, CommonModule, RouterModule],
  exports: [MainAppTemplateComponent],
})
export class MainAppTemplateModule {}
