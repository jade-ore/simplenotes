import { useEffect, useState } from "react";
import Note from './NoteDemo'
import supabase from "./supabase";

function NotesDemo() {

    const [currentTitle, setCurrentTitle] = useState("")
    const [currentDescription, setCurrentDescription] = useState("")
    const [notes, setNotes] = useState([])

    const handleNewNote = () => {
        e.preventDefault()
        setNotes((prev) => [...prev, {title: currentTitle, description: currentDescription}])
        setCurrentTitle("")
        setCurrentDescription("")
    }

    const deleteNote = (note) => {
        setNotes((prev) => {
            const index = prev.indexOf(note)
            if (index != -1) {
                prev.splice(index, 1);
            }
        })
    }

    return(
        <>
            <div id="create-note" className="bg-gray-100 w-fit mx-auto block px-6 mt-3 rounded py-3 outline-2">
                <form onSubmit={handleNewNote} className="flex flex-col items-center">
                    <input value={currentTitle} onChange={(e) => {setCurrentTitle(e.target.value)}} className="bg-slate-200 outline-slate-400 outline-2 w-100 rounded h-7 px-2 my-3" name="title" type="text" placeholder="Title"></input>
                    <textarea value={currentDescription} onChange={(e) => setCurrentDescription(e.target.value)} className="bg-slate-200 h-30 outline-2 rounded mb-3 w-100 px-2 outline-slate-400" name="description" placeholder="Note"></textarea>
                    <button className="bg-slate-600 active:bg-slate-600 hover:bg-slate-500 text-white font-bold p-2 rounded outline-2" type="submit">Make Note</button>
                </form>
            </div>

            <div className="grid">
                {notes ? notes.map((note) => (
                    <Note key={note.id} title={note.title} desc={note.description} note_id={note.id}></Note>
                )) : <></>}
            </div>
        </>
    )
}

export default NotesDemo