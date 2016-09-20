import {Page, NavController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {  
  constructor(public nav: NavController, navParams: NavParams) {
  }

  // Called when this page is popped from the nav stack
  private onPageWillUnload() {
  }
}