import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {AboutPage} from '../about/about';
import {Sql, Item} from "../../providers/sql";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    items: Item[]; 
 
    public constructor(private navCtrl: NavController, private sql: Sql, public alerCtrl: AlertController) {
              this.onPageDidEnter();
    }

        // Initialise the items by loading data from our DB
    private loadItems(): void {
        this.items = [];
        this.sql.getItems().then(
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
  public loadSortedItems(): void {
    this.items = [];
    this.sql.getSortedItems().then(
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

  public itemSelected(item: Item): void {
    this.updatePrompt(item);
  }

  // Remove the item from the DB and our current array
  public removeItem(item: Item): void {
    this.sql.removeItem(item);
    let index = this.items.indexOf(item);

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  // Remove all items from the DB and our current array
  public removeAllItems(): void {
    this.sql.removeAllItems();
    this.items = [];
  }

  // Load our items once the page appears
  private onPageDidEnter(): void {
    this.loadItems();
  }  

   // Push the about page
  public about(): void {
    this.navCtrl.push(AboutPage);
  }

  checkItem(item: Item): void {
    this.sql.toggleCheckedItem(item);                    
  }

  doPrompt(): void {
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

              this.sql.saveItem(item).then((data) => {
                    // Set the automatically created id to our item
                    // item.id = data.res["insertId"];
                    item.id = data.res["id"];                    
                  });
            }
            this.loadItems();
          }
        }
      ]
    });
    prompt.present();
  }

  updatePrompt(item: Item): void {
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
            
            this.sql.updateItem(item);                
            this.loadItems();                
          }
        }
      ]
    });
    prompt.present();
  }

  deletePrompt(): void {
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
   
  getStyle(item: Item): string {
    if(item.checked === 0){
      return "red";
    } else {
      return "green";
    }
  }
}