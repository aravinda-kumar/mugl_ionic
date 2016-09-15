import { Component } from '@angular/core';
import { Page, NavController } from 'ionic-angular';
import {NoteDetailPage} from '../note-detail/note-detail';
import {NoteService, Note} from '../../providers/note-service/note-service';

@Page({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  notes: Note[];

  constructor(public nav: NavController, public noteService: NoteService) {}

  // Initialise the notes by loading data from our DB
  private loadNotes() {
    this.notes = [];
    this.noteService.getNotes().then(
      data => {
        this.notes = [];
        if (data.res.rows.length > 0) {
          for (var i = 0; i < data.res.rows.length; i++) {
            let item = data.res.rows.item(i);
            this.notes.push(new Note(item.title, item.text, item.id));
          }
        }
      });
  }

  // Push the details page for our selected Note
  public noteSelected(item: Note) {
    this.nav.push(NoteDetailPage, {'note': item});
  }

  // Remove the note from the DB and our current arra
  public removeNote(note: Note) {
    this.noteService.removeNote(note);
    let index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
    }
  }

  // Load our todos once the page appears
  private onPageDidEnter() {
    this.loadNotes();
  }
  

   // Push the details page bute without an existing note
  public addNote() {
    this.nav.push(NoteDetailPage);
  }
}
