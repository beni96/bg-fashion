import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BgFashionPath } from '../../bg-fashion/router/bg-fashion.routes.names';

@Component({
  selector: 'app-state-message',
  templateUrl: './state-message.component.html',
  styleUrls: ['./state-message.component.scss'],
})
export class StateMessageComponent {
  @Input() imgUrl: string;
  @Input() title: number;
  @Input() subtitle: number;
  @Input() isReloadButton = false;

  constructor(private router: Router) {}

  onButtonClick() {
    this.isReloadButton ? window.location.reload() : this.router.navigate([BgFashionPath.Home]);
  }

  getButtonText() {
    return this.isReloadButton ? 'Try again' : 'Home';
  }
}
