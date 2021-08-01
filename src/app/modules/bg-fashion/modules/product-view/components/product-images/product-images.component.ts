import { Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';
import { getImgHeight, isEnterOrSpacePressed } from 'src/app/common/utils/utils';

const TRANSITION_DURATION = '300ms';

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
})
export class ProductImagesComponent implements OnInit {
  @Input() imgUrls: string[] = [];

  currentImgUrlIndex = 0;
  imgWidth: number;
  containerTransform: string;
  transitionDuration: string;

  @HostBinding('style.height.px') imgHeight: number;

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.getImgHeight();
    window.addEventListener('resize', () => this.getImgHeight());
  }

  getImgHeight() {
    this.imgWidth = this.host.nativeElement.offsetWidth;
    this.imgHeight = getImgHeight(this.imgWidth, 0);
  }

  onNextClick(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    if (this.currentImgUrlIndex + 1 === this.imgUrls.length) {
      this.transitionDuration = '0ms';
      this.imgUrls.push(this.imgUrls.shift()); // For shifting the array 1 postion backward.
      this.currentImgUrlIndex--;
      this.containerTransform = `translateX(${-(this.currentImgUrlIndex * this.imgWidth)}px)`;
    }

    setTimeout(() => {
      this.transitionDuration = TRANSITION_DURATION;
      this.currentImgUrlIndex = this.currentImgUrlIndex + 1;
      this.containerTransform = `translateX(${-(this.currentImgUrlIndex * this.imgWidth)}px)`;
    }, 0);
  }

  onBackClick(event?: KeyboardEvent) {
    if (event && !isEnterOrSpacePressed(event)) {
      return;
    }

    if (this.currentImgUrlIndex === 0) {
      this.transitionDuration = '0ms';
      this.imgUrls.unshift(this.imgUrls.pop()); // For shifting the array 1 postion forward.
      this.currentImgUrlIndex++;
      this.containerTransform = `translateX(${-(this.currentImgUrlIndex * this.imgWidth)}px)`;
    }

    setTimeout(() => {
      this.transitionDuration = TRANSITION_DURATION;
      this.currentImgUrlIndex = this.currentImgUrlIndex - 1;
      this.containerTransform = `translateX(${-(this.currentImgUrlIndex * this.imgWidth)}px)`;
    }, 0);
  }
}
