import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Sql, List } from "../../providers/sql";

@Component({
  selector: 'page-lists',
  templateUrl: 'lists.html'
})
export class ListsPage {

  lists: List[]; 

  constructor(public navCtrl: NavController, private sql: Sql, public alerCtrl: AlertController) {
    this.onPageDidEnter();
  }

  /* -----------------------------------------------------------------------------
                                  List Interaction
  -------------------------------------------------------------------------------- */
  
  public listSelected(list: List): void {
    this.updateListPrompt(list);
  }

  // Initialize the lists by loading data from our DB
  private loadLists(): void {
    this.lists = [];
    this.sql.getLists().then(
    data => {
      this.lists = [];
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let list = data.res.rows.item(i);
          this.lists.push(new List(list.id, list.list_title));
        }
      }
    });
  }

 // Remove all lists from the DB and our current array
  public removeAllLists(): void {
    this.sql.removeAllLists();
    this.lists = [];
  }

  // Remove the list from the DB and our current array
  public removeList(list: List): void {
    this.sql.removeList(list);
    let index = this.lists.indexOf(list);

    if (index > -1) {
      this.lists.splice(index, 1);
    }
  }

  /* -----------------------------------------------------------------------------
                                     Navigation
  -------------------------------------------------------------------------------- */

  // Load our lists once the page appears
  public onPageDidEnter(): void {
    this.loadLists();
  }

  /* -----------------------------------------------------------------------------
                                     UI Prompts
  -------------------------------------------------------------------------------- */  

  public deleteAllPrompt(): void {
    let prompt = this.alerCtrl.create({
      title: 'Delete all lists',
      message: "Really delete all lists?",
      inputs: [],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'OK',
          handler: data => {            
            this.removeAllLists();                
          }
        }
      ]
    });
    prompt.present();
  }

  public deletePrompt(list: List): void {
    let prompt = this.alerCtrl.create({
      title: 'Delete list',
      message: "Really delete this list?",
      inputs: [],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {}
        },
        {
          text: 'OK',
          handler: data => {            
            this.removeList(list);                
          }
        }
      ]
    });
    prompt.present();
  }

  public newListPrompt(): void {
    let prompt = this.alerCtrl.create({
      title: 'New List',
      message: "Enter a name for the new list",
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

            let list = new List(null, '');

            // use regex to check that at least one non-whitespace char is present
            if (/\S/.test(data.text)) {              
              list.list_title = data.text;

              this.sql.saveList(list).then((data) => {
                    // Set the automatically created id to our list
                    // list.id = data.res["insertId"];
                    list.id = data.res["id"];                    
                  });
            }
            this.loadLists();
          }
        }
      ]
    });
    prompt.present();
  }

  public updateListPrompt(list: List): void {
    let prompt = this.alerCtrl.create({
      title: 'Edit List',
      message: "Edit list title",
      inputs: [
        {
          name: 'text',          
          value: list.list_title
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
            list.list_title = data.text;
            
            this.sql.updateList(list);                
            this.loadLists();                
          }
        }
      ]
    });
    prompt.present();
  }
}