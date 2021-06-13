import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BgFashionModule } from './modules/bg-fashion/bg-fashion.module';
import { MainAppTemplateModule } from './modules/main-app-template/main-app-template.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BgFashionModule, MainAppTemplateModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
