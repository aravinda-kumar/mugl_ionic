import { Component } from '@angular/core';
import { Page, NavController, AlertController } from 'ionic-angular';
import {ItemService, Item} from '../../providers/item-service/item-service';
import {AboutPage} from '../about/about';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  items: Item[];  

  constructor(public nav: NavController, public itemService: ItemService, public alerCtrl: AlertController) {}

  // Initialise the items by loading data from our DB
  private loadItems() {
    this.items = [];
    this.itemService.getItems().then(
      data => {
        this.items = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.items.push(new Item(item.text, item.id, item.checked));
          }
        }
      });
  }
  
  // Looad sorted items from our DB
  private loadSortedItems() {
    this.items = [];
    this.itemService.getSortedItems().then(
      data => {
        this.items = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.items.push(new Item(item.text, item.id, item.checked));
          }
        }
      });
  }

  public itemSelected(item: Item) {
    this.updatePrompt(item);
  }

  // Remove the item from the DB and our current array
  public removeItem(item: Item) {
    this.itemService.removeItem(item);
    let index = this.items.indexOf(item);

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  // Remove all items from the DB and our current array
  public removeAllItems() {
    this.itemService.removeAllItems();
    this.items = [];
  }

  // Load our items once the page appears
  private onPageDidEnter() {
    this.loadItems();
  }  

   // Push the about page
  public about() {
    this.nav.push(AboutPage);
  }

  checkItem(item: Item) {
    this.itemService.toggleCheckedItem(item);                
    // this.loadItems();         
  }

  doPrompt() {
    let prompt = this.alerCtrl.create({
      title: 'New Item',
      message: "Enter an item for the list",
      inputs: [
        {
          name: 'text',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {

            let item = new Item('', null, 0);

            if (/\S/.test(data.text)) {
              // use regex to check that at least one non-whitespace char is present
              item.text = data.text;

              this.itemService.saveItem(item).then((data) => {
                    // Set the automatically created id to our item
                    item.id = data.res["insertId"];                    
                  });
            }
            this.loadItems();
          }
        }
      ]
    });
    prompt.present();
  }

  updatePrompt(item: Item) {
    let prompt = this.alerCtrl.create({
      title: 'Edit Item',
      message: "Edit list item",
      inputs: [
        {
          name: 'text',          
          value: item.text
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {            
            item.text = data.text;
            
            this.itemService.updateItem(item);                
            this.loadItems();                
          }
        }
      ]
    });
    prompt.present();
  }

  deletePrompt() {
    let prompt = this.alerCtrl.create({
      title: 'Delete all items',
      message: "Really delete all items?",
      inputs: [],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'OK',
          handler: data => {            
            this.removeAllItems();                
          }
        }
      ]
    });
    prompt.present();
  }
   
  getStyle(item: Item) {
    if(item.checked === 0){
      return "red";
    } else {
      return "green";
    }
  }
}