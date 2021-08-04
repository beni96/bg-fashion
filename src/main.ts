import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import firebase from 'firebase/app';
import 'firebase/analytics';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

const firebaseConfig = {
  apiKey: 'AIzaSyCB6HWpKjDik_oOznS8vil2J-bNvnhrvWI',
  authDomain: 'bg-fashion.firebaseapp.com',
  projectId: 'bg-fashion',
  storageBucket: 'bg-fashion.appspot.com',
  messagingSenderId: '80025544702',
  appId: '1:80025544702:web:9fca34f23967ac31e682af',
  measurementId: 'G-8FP1PCWMPW',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
