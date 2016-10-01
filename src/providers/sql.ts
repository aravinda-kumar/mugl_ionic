import { Injectable } from '@angular/core';

const DB_NAME: string = '__ionicstorage';
const win: any = window;

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
export class Sql {
    private _db: any;

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
                       checked INTEGER
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
    return this.query('SELECT * FROM items');
  }

   // Get all items from our DB, sorted
  public getSortedItems(): Promise<any> {
    return this.query('SELECT * FROM items ORDER BY text');
  }

  // Save a new item to the DB
  public saveItem(item: Item): Promise<any> {
    let sql = 'INSERT INTO items (text, checked) VALUES (?, ?)';
    return this.query(sql, [item.text, 0]);
  }

  // Update an existing item with a given ID
  public updateItem(item: Item): Promise<any> {
    let sql = 'UPDATE items SET text = \"' + item.text + '\" WHERE id = \"' + item.id + '\"';
    return this.query(sql);
  }

  public toggleCheckedItem(item: Item): Promise<any> {
    if (item.checked === 0) {
      item.checked = 1;
    } else {
      item.checked = 0;
    }

    let sql = 'UPDATE items SET checked = \"' + item.checked + '\" WHERE id = \"' + item.id + '\"';
    return this.query(sql);
  }

  // Remove an item with a given ID
  public removeItem(item: Item): Promise<any> {
    let sql = 'DELETE FROM items WHERE id = \"' + item.id + '\"';
    return this.query(sql);
  }
  
  // Remove all items
  public removeAllItems(): Promise<any> {
    let sql = 'DELETE FROM items';
    return this.query(sql);
  }
}