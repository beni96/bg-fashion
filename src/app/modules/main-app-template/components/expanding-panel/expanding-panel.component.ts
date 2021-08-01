import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { BgFashionPath, BG_FASHION_PREFIX } from 'src/app/modules/bg-fashion/router/bg-fashion.routes.names';
import { HeaderCategory } from '../../interfaces/header-category';

@Component({
  selector: 'app-expanding-panel',
  templateUrl: './expanding-panel.component.html',
  styleUrls: ['./expanding-panel.component.scss'],
})
export class ExpandingPanelComponent {
  @Input() title: string;

  @HostBinding('class.open') isOpen = false;

  onTitleClick() {
    this.isOpen = !this.isOpen;
  }
}
