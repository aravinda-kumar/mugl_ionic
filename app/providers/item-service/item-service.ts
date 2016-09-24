import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

export class Item {
  text: string;
  id: number;
  checked: number;
  constructor(text: string, id: number, checked: number) {
    this.text = text;
    this.id = id;
    this.checked = checked;
  }
}

@Injectable()
export class ItemService {
  
  storage: Storage = null;

  // Init an empty DB if it does not exist
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query(`CREATE TABLE IF NOT EXISTS items (
                       id INTEGER PRIMARY KEY AUTOINCREMENT, 
                       text TEXT,
                       checked INTEGER
                       )`);
  }

  // Get all items from our DB
  public getItems() {
    return this.storage.query('SELECT * FROM items');
  }

   // Get all items from our DB, sorted
  public getSortedItems() {
    return this.storage.query('SELECT * FROM items ORDER BY text');
  }

  // Save a new item to the DB
  public saveItem(item: Item) {
    let sql = 'INSERT INTO items (text, checked) VALUES (?, ?)';
    return this.storage.query(sql, [item.text, 0]);
  }

  // Update an existing item with a given ID
  public updateItem(item: Item) {
    let sql = 'UPDATE items SET text = \"' + item.text + '\" WHERE id = \"' + item.id + '\"';
    this.storage.query(sql);
  }

  public toggleCheckedItem(item: Item) {
    if (item.checked === 0) {
      item.checked = 1;
    } else {
      item.checked = 0;
    }

    let sql = 'UPDATE items SET checked = \"' + item.checked + '\" WHERE id = \"' + item.id + '\"';
    this.storage.query(sql);
  }

  // Remove an item with a given ID
  public removeItem(item: Item) {
    let sql = 'DELETE FROM items WHERE id = \"' + item.id + '\"';
    this.storage.query(sql);
  }
  
  // Remove all items
  public removeAllItems() {
    let sql = 'DELETE FROM items';
    this.storage.query(sql);
  }
}
