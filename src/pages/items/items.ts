import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController, FabContainer } from 'ionic-angular';
import { Sql, Item } from "../../providers/sql";

@Component({
  selector: 'page-items',
  templateUrl: 'items.html'
})
export class ItemsPage {

  items: Item[];
  public thisListTitle: string;

  public constructor(private navCtrl: NavController, private sql: Sql, public alerCtrl: AlertController, public actionSheetCtrl: ActionSheetController) {
    this.onPageDidEnter();
  }

  /* ----------------------------------------------------------------------------- 
                               Item Interaction
  -------------------------------------------------------------------------------- */

  public checkItem(item: Item): void {
    this.sql.toggleCheckedItem(item);
  }

  public getStyle(item: Item): string {
    if (item.checked == false) {
      return "red";
    } else {
      return "green";
    }
  }

  public itemSelected(item: Item): void {
    this.updatePrompt(item);
  }

  // Initialize the items by loading data from our DB
  private loadItems(): void {
    this.items = [];
    this.sql.getItems().then(
      data => {
        this.items = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.items.push(new Item(item.text, item.id, item.checked, item.list_id));
          }
        }
      });
  }

  // Load sorted items from our DB
  public loadSortedItems(fab: FabContainer): void {
    fab.close();
    this.items = [];
    this.sql.getSortedItems().then(
      data => {
        this.items = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.items.push(new Item(item.text, item.id, item.checked, item.list_id));
          }
        }
      });
  }

  // Remove all items from the DB and our current array
  public removeAllItems(): void {
    this.sql.removeAllItems();
    this.items = [];
  }

  // Remove all checked items from the DB and our current array
  public removeCheckedItems(): void {
    this.sql.removeCheckedItems();
    this.loadItems();
  }

  // Remove the item from the DB and our current array
  public removeItem(item: Item): void {
    this.sql.removeItem(item);
    let index = this.items.indexOf(item);

    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  /* -----------------------------------------------------------------------------
                                     Navigation
  -------------------------------------------------------------------------------- */

  // Load our items once the page appears
  public onPageDidEnter(): void {
    this.thisListTitle = this.sql.listName;
    this.loadItems();
  }

  /* -----------------------------------------------------------------------------
                                     UI Prompts
  -------------------------------------------------------------------------------- */

  public deletePrompt(fab: FabContainer): void {
    fab.close();
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Delete Items',
      buttons: [
        {
          text: 'Delete All',
          role: 'destructive',
          handler: data => {
            this.removeAllItems();
          }
        }, {
          text: 'Delete Checked',
          handler: data => {
            this.removeCheckedItems();
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
          }
        }
      ]
    });
    actionSheet.present();
  }

  public newItemPrompt(): void {
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

            let item = new Item('', null, false, this.sql.whichList);
            console.log(item.list_id);

            // use regex to check that at least one non-whitespace char is present
            if (/\S/.test(data.text)) {
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

  public updatePrompt(item: Item): void {
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
}