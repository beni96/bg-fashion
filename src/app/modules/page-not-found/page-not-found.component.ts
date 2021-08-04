import { Component, Inject, OnInit } from '@angular/core';
import { GoogleAnalyticsEvent } from 'src/app/common/events/analytics-events';
import { FIREBASE_TOKEN } from 'src/app/tokens/firebase/firebase-token';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class PageNotFoundComponent implements OnInit {
  constructor(@Inject(FIREBASE_TOKEN) private firebaseService) {}

  ngOnInit() {
    this.firebaseService.analytics().logEvent(GoogleAnalyticsEvent.ErrorPageInit);
  }
}
