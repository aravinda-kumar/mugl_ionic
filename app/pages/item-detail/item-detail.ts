import {Page, NavController, NavParams, Toast} from 'ionic-angular';
import {ItemService, Item} from '../../providers/item-service/item-service';

@Page({
  templateUrl: 'build/pages/item-detail/item-detail.html'
})
export class ItemDetailPage {
  item: Item = null;


  constructor(public nav: NavController, navParams: NavParams, public itemService: ItemService) {
    let passedNote = navParams.get('item');
    // Try to initialise our item for the page
    if (passedNote !== undefined) {
      this.item = passedNote;
    } else {
      this.item = new Item('', '', null);
      this.saveNote();
    }
  }


  // Save our item to the DB and show a message (optional)
  public saveNote(showBadge: boolean = false) {
    if (this.item.id === null) {
      this.itemService.saveItem(this.item).then((data) => {
        // Set the automatic created id to our item
        this.item.id = data.res["insertId"];
      });
    } else {
      this.itemService.updateItem(this.item);
    }
    if (showBadge) {
     /* let toast = Toast.create({
        message: 'Note saved',
        duration: 3000
      });
      this.nav.present(toast); */
    }
  }

  // Called when this page is popped from the nav stack
  private onPageWillUnload() {
    this.saveNote(true);
  }
  
}
