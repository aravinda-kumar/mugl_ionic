import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

export class Note {
  title: string;
  text: string;
  id: number;
  constructor(title: string, text: string, id: number) {
    this.title = title;
    this.text = text;
    this.id = id;
  }
}

@Injectable()
export class NoteService {
  
  storage: Storage = null;

  // Init an empty DB if it does not exist by now!
  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT)');
  }

  // Get all notes of our DB
  public getNotes() {
    return this.storage.query('SELECT * FROM notes');
  }

  // Save a new note to the DB
  public saveNote(note: Note) {
    let sql = 'INSERT INTO notes (title, text) VALUES (?,?)';
    return this.storage.query(sql, [note.title, note.text]);
  }

  // Update an existing note with a given ID
  public updateNote(note: Note) {
    let sql = 'UPDATE notes SET title = \"' + note.title + '\", text = \"' + note.text + '\" WHERE id = \"' + note.id + '\"';
    this.storage.query(sql);
  }

  // Remoe a not with a given ID
  public removeNote(note: Note) {
    let sql = 'DELETE FROM notes WHERE id = \"' + note.id + '\"';
    this.storage.query(sql);
  }
  
}
