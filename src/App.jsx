import { useState } from 'react'
import Login from './components/Login'
import supabase from './components/supabase'
import Notes from './components/Notes'
import Header from './components/Header'

function App() {
 
  const [session, setSession] = useState(null)

  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.warn("error in getting session: ", error)
    } else {
      setSession(data.session)
    }
  }

  const handleSignout = async () => {
    const {error} = await supabase.auth.signOut()
    if (error) {
      console.warn("signout error: ", error)
    }
    setSession(null) 
  }


  return (
    <>
      {session ? <> 
      <Header handleSignout={handleSignout}/>
      <Notes></Notes>
      </> : <Login setSession={setSession} />}
    </>
  )
}

export default App
