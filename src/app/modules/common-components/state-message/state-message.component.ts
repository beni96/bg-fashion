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

  constructor(private router: Router) {}

  navigateHome() {
    this.router.navigate([BgFashionPath.Home]);
  }
}
