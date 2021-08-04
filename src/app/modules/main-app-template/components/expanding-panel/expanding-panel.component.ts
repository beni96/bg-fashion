import { Component, HostBinding, Input } from '@angular/core';

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
