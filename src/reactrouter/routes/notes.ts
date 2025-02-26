import localforage from "localforage";

export interface Note {
  id: string;
  title: string;
  content: string;
}

interface CreateNoteParams {
  title: string;
  content: string;
}

export async function getNotes(): Promise<Note[]> {
  let notes = await localforage.getItem<Note[]>("notes");
  if (!notes) notes = [];
  return notes;
}

export async function createNote({ title, content }: CreateNoteParams): Promise<Note> {
  let id = Math.random().toString(36).substring(2, 9);
  let note: Note = { id, title, content };
  let notes = await getNotes();
  notes.unshift(note);
  await set(notes);
  return note;
}

export async function getNote(id: string): Promise<Note | null> {
  let notes = await localforage.getItem<Note[]>("notes");
  if (!notes) return null;
  let note = notes.find((note) => note.id === id);
  return note ?? null;
}

export async function deleteNote(id: string): Promise<boolean> {
  let notes = await localforage.getItem<Note[]>("notes");
  if (!notes) return false;
  let index = notes.findIndex((note) => note.id === id);
  if (index > -1) {
    notes.splice(index, 1);
    await set(notes);
    return true;
  }
  return false;
}

function set(notes: Note[]): Promise<Note[]> {
  return localforage.setItem("notes", notes);
}
