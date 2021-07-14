import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonComponentsModule } from 'src/app/modules/common-components/common-components.module';
import { AdminViewComponent } from './admin-view.component';
import { EditHomePageLinkComponent } from './edit-home-page-link/edit-home-page-link.component';
import { EditHomePageComponent } from './edit-home-page/edit-home-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminViewComponent, EditHomePageComponent, EditHomePageLinkComponent],
  imports: [BrowserModule, CommonModule, CommonComponentsModule, ReactiveFormsModule],
})
export class AdminViewModule {}
