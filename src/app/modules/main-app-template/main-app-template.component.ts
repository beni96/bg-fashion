import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CONFIRMATION_IMAGE_URL, HeaderMenuImageUrl, HomePageImageUrl } from 'src/app/common/images-url/images-url';
import { BgFashionPath } from '../bg-fashion/router/bg-fashion.routes.names';

const MOBILE_LAYOUT_MAX_WIDTH = 760;

@Component({
  selector: 'app-main-app-template',
  templateUrl: './main-app-template.component.html',
  styleUrls: ['./main-app-template.component.scss'],
})
export class MainAppTemplateComponent implements OnInit, AfterViewInit, OnDestroy {
  isImagesLoaded = false;
  loadedImagesCounter = 0;
  isLoadingError = false;
  isMobile = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        switch (event.url) {
          case `/${BgFashionPath.Home}`:
            this.loadHomeImages();
            break;
          default:
            this.isMobile ? (this.isImagesLoaded = true) : this.loadImages(Object.values(HeaderMenuImageUrl));
            break;
        }
      }
    });
  }

  ngAfterViewInit() {
    this.isMobile = this.isMobileLayout();
    window.addEventListener('resize', () => {
      return (this.isMobile = this.isMobileLayout());
    });
  }

  isMobileLayout() {
    return document.body.clientWidth <= MOBILE_LAYOUT_MAX_WIDTH;
  }

  loadHomeImages() {
    const homeImageUrls = Object.values(HomePageImageUrl);
    const headerMenuImageUrls = this.isMobile ? [] : Object.values(HeaderMenuImageUrl);
    this.loadImages([...homeImageUrls, ...headerMenuImageUrls, CONFIRMATION_IMAGE_URL]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadImages(imageUrls: string[]) {
    if (!imageUrls?.length) {
      this.isImagesLoaded = true;
      return;
    }

    this.isImagesLoaded = false;
    this.loadedImagesCounter = 0;

    imageUrls.forEach((imageUrl) => {
      const img = new Image();
      img.onload = () => this.onImageLoad(imageUrls.length);
      img.onerror = () => (this.isLoadingError = true);
      img.src = imageUrl;
    });
  }

  private onImageLoad(imagesCount: number) {
    if (++this.loadedImagesCounter === imagesCount) {
      this.isImagesLoaded = true;
    }
  }
}
