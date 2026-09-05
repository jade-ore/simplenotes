import { useState } from "react"
import supabase from "./supabase"

function NoteDemo({title, desc, note_id}) {

    const [editMode, setEditMode] = useState(false)
    const [noteInfo, setNoteInfo] = useState({title: title, description: desc})
    const [editedInfo, setEditedInfo] = useState({title: "", description: ""})


    const handleDelete = async () => {
        const {error} = await supabase.from("Notes").delete().eq("id", note_id)
        if (error) {
            console.warn("error deleting: ", error)
        }
    }

    const editTitle = (e) => {
        setEditedInfo(prev => ({
            ...prev,
            title: e.target.value
        }))
    }

    const editDescription = (e) => {
        setEditedInfo(prev => ({
            ...prev,
            description: e.target.value
        }))
            
    }

    return(
        <div className="bg-slate-200 m-3 p-2 rounded flex-col">
            <div className="flex justify-between"> 
                {editMode ? <input value={editedInfo.title} onChange={editTitle} className="bg-slate-200 outline-slate-400 outline-2 rounded h-7 px-2 mb-2 mr-2 flex-grow"></input> : <p className="break-words font-bold text-xl">{noteInfo.title}</p>}
                <div className="space-x-1">
                    {editMode ? <button onClick={() => {
                        setNoteInfo(editedInfo)
                        setEditMode(false)
                    }} className="
                            bg-slate-600 hover:bg-slate-500 active:bg-slate-600 
                            text-white px-2 
                            font-bold rounded">Finish Editing</button> : <>
                        <button onClick={() => {
                            setEditMode(true)
                            setEditedInfo(noteinf)
                        }} className="
                            bg-slate-600 hover:bg-slate-500 active:bg-slate-600 
                            text-white px-2 
                            font-bold rounded">Edit</button>
                        <button onClick={handleDelete} className="bg-slate-600 hover:bg-slate-500 active:bg-slate-600 text-white px-2 font-bold rounded">Delete</button>
                    </>}

                </div>
            </div> 
            <hr></hr>
            {editMode ? <textarea value={editedInfo.description} onChange={editDescription} className="bg-slate-200 w-full outline-slate-400 outline-2 rounded h-7 px-2 mt-3"></textarea> : <p className="break-words">{noteInfo.description}</p>}
        </div>
    )
}

export default NoteDemo