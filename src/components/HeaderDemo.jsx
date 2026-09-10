function HeaderDemo({handleSignout}) {

    return (
        <nav>
            <ul className="flex justify-between bg-slate-500 px-2">
                <li>simplenotes</li>
                <li>
                    <button onClick={handleSignout} className="hover:text-white active:text-black">Go Back</button>
                </li>
            </ul>
        </nav>
    )
}

export default HeaderDemo