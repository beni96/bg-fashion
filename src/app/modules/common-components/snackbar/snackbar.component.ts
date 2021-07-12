import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
  animations: [
    trigger('showSnackbar', [
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      state(
        'show',
        style({
          opacity: 1,
        })
      ),
      transition('show => hide', [animate('0.2s')]),
      transition('hide => show', [animate('0.2s')]),
    ]),
  ],
})
export class SnackbarComponent implements OnInit {
  @Input() snackbarLabel$: Observable<string>;
  label: string;
  shouldShowSnackbar = false;

  ngOnInit() {
    this.snackbarLabel$.subscribe((label: string) => {
      this.label = label;
      this.shouldShowSnackbar = true;
      this.dismissSnackbar();
    });
  }

  dismissSnackbar() {
    setTimeout(() => (this.shouldShowSnackbar = false), 2000);
  }
}
