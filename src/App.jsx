import { useState } from 'react'
import Login from './components/Login'
import supabase from './components/supabase'
import Notes from './components/Notes'
import Header from './components/Header'
import NotesDemo from './components/NotesDemo'
import HeaderDemo from './components/HeaderDemo'

function App() {
 
  const [session, setSession] = useState(null)
  const [demoActive, setDemoActive] = useState(false)

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

  const switchDemo = () => {
    setDemoActive((prev) => !prev)
  }

  


  return (
    <>
      {demoActive ?
      <>
        <HeaderDemo handleSignout={switchDemo}></HeaderDemo>
        <NotesDemo></NotesDemo>
      </> : session ? <>
        <Header handleSignout={handleSignout} />
        <Notes></Notes>
      </> : <Login setSession={setSession} switchDemo={switchDemo} />
      }
    </>
  )
}

export default App
