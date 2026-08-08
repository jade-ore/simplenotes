function Header({handleSignout}) {

    

    return (
        <nav>
            <ul className="flex justify-between bg-slate-500 px-2">
                <li>simplenotes</li>
                <li>
                    <button onClick={handleSignout} className="hover:text-white active:text-black">Sign out</button>
                </li>
            </ul>
        </nav>
    )
}

export default Header