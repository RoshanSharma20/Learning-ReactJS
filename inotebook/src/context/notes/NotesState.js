import { useState } from 'react';
import NotesContext from './NotesContext';

const NotesState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial);

    //CRUD operations on note
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNjZhNjcwZDQ3MWYyNDZkMjM0MzI0In0sImlhdCI6MTY3NTQwNzA5M30.i__S1VhU5WkD82LjN0G2R51EgYckL403p9FiBOno4Mc"
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    const addNote = async (title, description, tag) => {
        console.log("adding a new note");
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNjZhNjcwZDQ3MWYyNDZkMjM0MzI0In0sImlhdCI6MTY3NTQwNzA5M30.i__S1VhU5WkD82LjN0G2R51EgYckL403p9FiBOno4Mc"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNjZhNjcwZDQ3MWYyNDZkMjM0MzI0In0sImlhdCI6MTY3NTQwNzA5M30.i__S1VhU5WkD82LjN0G2R51EgYckL403p9FiBOno4Mc"
            },
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }

    const editNote = async (id, title, description, tag) => {
        //API call  
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNkNjZhNjcwZDQ3MWYyNDZkMjM0MzI0In0sImlhdCI6MTY3NTQwNzA5M30.i__S1VhU5WkD82LjN0G2R51EgYckL403p9FiBOno4Mc"
            },
            body: JSON.stringify({ title, description, tag }) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        // const json = response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NotesContext.Provider value={{ notes, getNotes, addNote, deleteNote, editNote }}>
            {props.children}
        </NotesContext.Provider >
    )
}

export default NotesState;