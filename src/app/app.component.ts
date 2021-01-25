import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase/app';
import 'firebase/analytics';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    var firebaseConfig = {
      apiKey: "AIzaSyC3ouUCJsOG6h_E5nxR5UAiuwoZmpIoVQQ",
      authDomain: "skippyq-f0d32.firebaseapp.com",
      databaseURL: "https://skippyq-f0d32.firebaseio.com",
      projectId: "skippyq-f0d32",
      storageBucket: "skippyq-f0d32.appspot.com",
      messagingSenderId: "616333919837",
      appId: "1:616333919837:web:fa190f2eef2261d4cc6fb4",
      measurementId: "G-0FZD5W73M8"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
