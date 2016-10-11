import { Injectable } from '@angular/core';

const DB_NAME: string = '__ionicstorage';
const win: any = window;

export class Item {
  text: string;
  id: number;
  checked: boolean;
  list_id: number;
  constructor(text: string, id: number, checked: boolean, list_id: number) {
    this.text = text;
    this.id = id;
    this.checked = checked;
    this.list_id = list_id;
  }
}

export class List {
  id: number;
  list_title: string;
  constructor(id: number, list_title: string) {
    this.id = id;
    this.list_title = list_title;
  }
}

@Injectable()
export class Sql {
    private _db: any;
    public whichList: number;
    public listName: string;

    constructor() {
        if (win.sqlitePlugin) {
            this._db = win.sqlitePlugin.openDatabase({
                name: DB_NAME,
                location: 2,
                createFromLocation: 0
            });

        } else {
            console.warn('Storage: SQLite plugin not installed, falling back to WebSQL. Make sure to install cordova-sqlite-storage in production!');

            this._db = win.openDatabase(DB_NAME, '1.0', 'database', 5 * 1024 * 1024);
        }
        this._tryInit();
    }

    // Initialize the DB with our required tables
    _tryInit() {
        this.query(`CREATE TABLE IF NOT EXISTS items (
                       id INTEGER PRIMARY KEY AUTOINCREMENT,                        
                       text TEXT,
                       checked INTEGER,
                       list_id INTEGER
                       )`).catch(err => {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
        });

        this.query(`CREATE TABLE IF NOT EXISTS lists (
                       id INTEGER PRIMARY KEY AUTOINCREMENT, 
                       list_title TEXT                       
                       )`).catch(err => {
            console.error('Storage: Unable to create initial storage tables', err.tx, err.err);
        });
    }

    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form { tx: Transaction, res: Result (or err)}
     */
    query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this._db.transaction((tx: any) => {
                        tx.executeSql(query, params,
                            (tx: any, res: any) => resolve({ tx: tx, res: res }),
                            (tx: any, err: any) => reject({ tx: tx, err: err }));
                    },
                    (err: any) => reject({ err: err }));
            } catch (err) {
                reject({ err: err });
            }
        });
    }

  // Get all items from our DB
  public getItems(): Promise<any> {
    return this.query('SELECT * FROM items where list_id = \"' + this.whichList + '\"');    
  }

   // Get all lists from our DB
  public getLists(): Promise<any> {
    return this.query('SELECT * FROM lists');    
  }

   // Get all items from our DB, sorted
  public getSortedItems(): Promise<any> {
    return this.query('SELECT * FROM items WHERE list_id = \"' + this.whichList + '\" ORDER BY text');
  }
    
  // Remove all items
  public removeAllItems(): Promise<any> {
    let sql = 'DELETE FROM items';
    return this.query(sql);
  }

  // Remove all items
  public removeAllLists(): Promise<any> {
    // TODO make items in items table delete too
    let sql = 'DELETE FROM lists';
    this.query(sql);

    sql = 'DELETE FROM items';
    return this.query(sql);
  }

  // Remove an item with a given ID
  public removeItem(item: Item): Promise<any> {
    let sql = 'DELETE FROM items WHERE id = \"' + item.id + '\"';
    return this.query(sql);
  }

  // Remove a list with a given ID
  public removeList(list: List): Promise<any> {
    // TODO make items in items table delete too
    let sql = 'DELETE FROM lists WHERE id = \"' + list.id + '\"';
    this.query(sql);

    sql = 'DELETE FROM items WHERE list_id = \"' + list.id + '\"';
    return this.query(sql);
  }

  // Save a new item to the DB
  public saveItem(item: Item): Promise<any> {
    let sql = 'INSERT INTO items (text, checked, list_id) VALUES (?, ?, ?)';
    console.log(sql);
    return this.query(sql, [item.text, 0, item.list_id]);
  }

  // Save a new list to the DB
  public saveList(list: List): Promise<any> {
    let sql = 'INSERT INTO lists (list_title) VALUES (?)';
    return this.query(sql, [list.list_title]);
  }

  public toggleCheckedItem(item: Item): Promise<any> {
    let oneOrZero = 0;
    if (item.checked == false) {
      item.checked = true;
      oneOrZero = 1;
    } else {
      item.checked = false;
      oneOrZero = 0;
    }



    let sql = 'UPDATE items SET checked = \"' + oneOrZero + '\" WHERE id = \"' + item.id + '\"';
    return this.query(sql);
  }

  // Update an existing item with a given ID
  public updateItem(item: Item): Promise<any> {
    let sql = 'UPDATE items SET text = \"' + item.text + '\" WHERE id = \"' + item.id + '\"';
    return this.query(sql);
  }

  // Update an existing list with a given ID
  public updateList(list: List): Promise<any> {
    let sql = 'UPDATE lists SET list_title = \"' + list.list_title + '\" WHERE id = \"' + list.id + '\"';
    return this.query(sql);
  }
}