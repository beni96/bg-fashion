import { InjectionToken } from '@angular/core';
import firebase from 'firebase';

/**
 * DI token for firebase.
 * This assist with unit tests that require firebase analytics.
 */
export const FIREBASE_TOKEN = new InjectionToken('Firebase API', {
  factory: () => firebase,
  providedIn: 'root',
});
