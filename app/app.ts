import { Component } from '@angular/core';
import { App, ionicBootstrap, Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home';

import {ItemService} from './providers/item-service/item-service';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [ItemService]
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(public platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
