var assert = require('assert');
const { addNote, getAllNotes, getNoteById, updateNote, deleteNote } = require('./notes');

const notes = [
    {
        id: 1,
        title: 'Test Title',
        content: 'Test Content'
    },
    {
        id: 2,
        title: 'Test Title 2',
        content: 'Test Content 2'
    }
]

describe('Notes Module', () => {
    describe('addNote', () => {
        it('should return empty array when no notes exist', () => {
            const allNotes = getAllNotes();
            assert.deepEqual(allNotes, notes.slice(0, 0));
        });
        it('should add a new note with correct id and properties', () => {
            const note = addNote(notes[0].title, notes[0].content);
            
            assert.equal(note.id, notes[0].id);
            assert.equal(note.title, notes[0].title);
            assert.equal(note.content, notes[0].content);
            assert.equal(getAllNotes().length, 1);
        });
    });

    describe('getAllNotes', () => {
        it('should return empty array when no notes exist', () => {
            const allNotes = getAllNotes();
            assert.deepEqual(allNotes, notes.slice(0, 1));
        });

        it('should return all added notes', () => {
            addNote(notes[1].title, notes[1].content);
            
            const allNotes = getAllNotes();
            assert.equal(allNotes.length, 2);
            assert.equal(allNotes[0].title, notes[0].title);
            assert.equal(allNotes[1].title, notes[1].title);
        });
    });

    describe('getNoteById', () => {
        it('should return correct note when id exists', () => {
            const addedNote = addNote(notes[0].title, notes[0].content);
            const foundNote = getNoteById(addedNote.id);
            
            assert.deepEqual(foundNote, addedNote);
        });

        it('should return undefined when id does not exist', () => {
            const note = getNoteById(999);
            assert.equal(note, undefined);
        });
    });

    describe('updateNote', () => {
        it('should update note when id exists', () => {
            const note = addNote(notes[0].title, notes[0].content);
            const updatedNote = updateNote(note.id, 'Updated Title', 'Updated Content');
            
            assert.equal(updatedNote.title, 'Updated Title');
            assert.equal(updatedNote.content, 'Updated Content');
            assert.equal(updatedNote.id, note.id);
        });

        it('should return undefined when updating non-existent note', () => {
            const result = updateNote(999, 'Title', 'Content');
            assert.equal(result, undefined);
        });
    });

    describe('deleteNote', () => {
        it('should delete note when id exists', () => {
            const note = addNote(notes[0].title, notes[0].content);
            const deletedNote = deleteNote(note.id);
            
            assert.deepEqual(deletedNote, note);
            assert.equal(getAllNotes().length, 4);
        });

        it('should return null when deleting non-existent note', () => {
            const result = deleteNote(999);
            assert.equal(result, null);
        });
    });
});

