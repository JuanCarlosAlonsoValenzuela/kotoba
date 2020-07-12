import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/folder/Home',
      icon: 'home'
    },
    {
      title: 'Beginner',
      url: '/folder/N5',
      icon: 'alert'
    },
    {
      title: 'Basic',
      url: '/folder/N4',
      icon: 'alert'
    },
    {
      title: 'Intermediate',
      url: '/folder/N3',
      icon: 'alert'
    },
    {
      title: 'Advanced',
      url: '/folder/N2',
      icon: 'alert'
    },
    {
      title: 'Expert',
      url: '/folder/N1',
      icon: 'alert'
    },
    {
      title: 'Custom lists',
      url: '/folder/Custom',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
