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

  // Load our lists once the page appears
  public onPageDidEnter(): void {
    this.loadLists();
  }

  // Initialise the lists by loading data from our DB
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
}