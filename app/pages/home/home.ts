import { Component } from '@angular/core';
import { Page, NavController } from 'ionic-angular';
import {ItemDetailPage} from '../item-detail/item-detail';
import {ItemService, Item} from '../../providers/item-service/item-service';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  items: Item[];

  constructor(public nav: NavController, public itemService: ItemService) {}

  // Initialise the items by loading data from our DB
  private loadItems() {
    this.items = [];
    this.itemService.getItems().then(
      data => {
        this.items = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.items.push(new Item(item.title, item.text, item.id));
          }
        }
      });
  }

  // Push the details page for our selected Item
  public itemSelected(item: Item) {
    this.nav.push(ItemDetailPage, {'item': item});
  }

  // Remove the item from the DB and our current arra
  public removeItem(item: Item) {
    this.itemService.removeItem(item);
    let index = this.items.indexOf(item);

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  // Load our todos once the page appears
  private onPageDidEnter() {
    this.loadItems();
  }
  

   // Push the details page bute without an existing item
  public addItem() {
    this.nav.push(ItemDetailPage);
  }
}
