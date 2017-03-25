import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ItemsPage } from '../pages/items/items';
import { ListsPage } from '../pages/lists/lists';
import { Sql } from "../providers/sql";

import { StatusBar } from '@ionic-native/status-bar';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ItemsPage,
    ListsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, { swipeBackEnabled: false })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ItemsPage,
    ListsPage
  ],
  providers: [Sql, StatusBar]
})
export class AppModule { }
