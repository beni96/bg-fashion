import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAppTemplateComponent } from './main-app-template.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { CounterComponent } from './components/counter/counter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderMobileMenuComponent } from './components/header-mobile-menu/header-mobile-menu.component';
import { ExpandingPanelComponent } from './components/expanding-panel/expanding-panel.component';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
  declarations: [
    MainAppTemplateComponent,
    HeaderComponent,
    HeaderMenuComponent,
    FooterComponent,
    CounterComponent,
    HeaderMobileMenuComponent,
    ExpandingPanelComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, CommonModule, RouterModule, CommonComponentsModule],
  exports: [MainAppTemplateComponent],
})
export class MainAppTemplateModule {}
