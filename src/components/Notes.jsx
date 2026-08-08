import { useEffect, useState } from "react";
import Note from './Note'
import supabase from "./supabase";

function Notes() {

    const [currentTitle, setCurrentTitle] = useState("")
    const [currentDescription, setCurrentDescription] = useState("")
    const [session, setSession] = useState(null)
    const [notes, setNotes] = useState(null)

    const getSession = async () => {
        const {data, error} = await supabase.auth.getSession()
        if (error) {
            console.warn("error in getting session: ", error)
        } else {
            setSession(data.session)
        }
    }

    const fetch_notes = async () => {
        const {data, error} = await supabase.from('Notes').select('*')
        if (error) {
            console.warn("fetching data error: ", error)
        } else {
            setNotes(data)
        }
    }

    useEffect(() => {
        getSession()
        const interval = setInterval(() => {
            fetch_notes()
            console.log("this happne")
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const handleNewNote = async (e) => {
        e.preventDefault()
        await supabase.from('Notes').insert({user_id: session.user.id, title: currentTitle, description: currentDescription})
        fetch_notes()
    }

    return(
        <>
            <div id="create-note" className="bg-gray-100 w-fit mx-auto block px-6 mt-3 rounded py-3 outline-2">
                <form onSubmit={handleNewNote} className="flex flex-col items-center">
                    <input onChange={(e) => {setCurrentTitle(e.target.value)}} className="bg-slate-200 outline-slate-400 outline-2 w-100 rounded h-7 px-2 my-3" name="title" type="text" placeholder="Title"></input>
                    <textarea onChange={(e) => setCurrentDescription(e.target.value)} className="bg-slate-200 h-30 outline-2 rounded mb-3 w-100 px-2 outline-slate-400" name="description" placeholder="Note"></textarea>
                    <button className="bg-slate-600 active:bg-slate-600 hover:bg-slate-500 text-white font-bold p-2 rounded outline-2" type="submit">Make Note</button>
                </form>
            </div>

            <div>
                {notes ? notes.map((note) => (
                    <Note key={note.id} title={note.title} desc={note.description} note_id={note.id}></Note>
                )) : <></>}
            </div>
        </>
    )
}

export default Notes