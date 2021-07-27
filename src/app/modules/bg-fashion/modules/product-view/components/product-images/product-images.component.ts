import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { getImgHeight, isEnterOrSpacePressed } from 'src/app/common/utils/utils';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
})
export class ProductImagesComponent implements OnInit {
  @Input() imgUrls: string[] = [];

  currentImgUrlIndex = 0;
  imgHeight: number;

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.getImgHeight();
    window.addEventListener('resize', () => this.getImgHeight());
  }

  getImgHeight() {
    const imageWidth = this.host.nativeElement.offsetWidth;
    this.imgHeight = getImgHeight(imageWidth, 0);
  }

  onNextClick(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    this.currentImgUrlIndex = (this.currentImgUrlIndex + 1) % this.imgUrls.length;
  }

  onBackClick(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    this.currentImgUrlIndex = (this.currentImgUrlIndex + this.imgUrls.length - 1) % this.imgUrls.length;
  }
}
