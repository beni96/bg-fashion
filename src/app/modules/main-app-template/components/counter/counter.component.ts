import { Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnChanges {
  @Input() count: number;

  @HostBinding('class.animation') animation = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.count && !changes.count.firstChange) {
      this.startAnimation();
    }
  }

  startAnimation() {
    this.animation = true;
    setTimeout(() => (this.animation = false), 1500);
  }
}
