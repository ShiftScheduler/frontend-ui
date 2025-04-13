import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: Note[] = [];
  newNote: Note = { title: '', content: '' };

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes(): void {
    this.notesService.getNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  createNote(): void {
    if (!this.newNote.title.trim()) return;

    this.notesService.createNote(this.newNote).subscribe((note) => {
      this.notes.unshift(note); // Add new note to top
      this.newNote = { title: '', content: '' }; // Reset form
    });
  }

  deleteNote(id: number): void {
    this.notesService.deleteNote(id).subscribe(() => {
      this.notes = this.notes.filter((note) => note.id !== id);
    });
  }
}
