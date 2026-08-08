function Note({title, desc, note_id}) {

    return(
        <div className="bg-slate-200 m-3 p-2 rounded">
            <div className="flex justify-between"> 
                <p className="break-words font-bold text-xl">{title}</p>
                <div className="space-x-1">
                    <button className="bg-slate-600 text-white px-2 font-bold rounded">Edit</button>
                    <button className="bg-slate-600 text-white px-2 font-bold rounded">Delete</button>
                </div>
            </div> 
            <hr></hr>
            <p className="break-words">{desc}</p>
        </div>
    )
}

export default Note