import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BgFashionModule } from './modules/bg-fashion/bg-fashion.module';
import { MainAppTemplateModule } from './modules/main-app-template/main-app-template.module';
import { PageNotFoundModule } from './modules/page-not-found/page-not-found.module';
import { AdminModule } from './modules/admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, BgFashionModule, MainAppTemplateModule, PageNotFoundModule, AdminModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
