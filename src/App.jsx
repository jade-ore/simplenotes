import { useState } from 'react'
import Login from './components/Login'
import supabase from './components/supabase'
import Notes from './components/Notes'

function App() {
  
  const getSession = async () => {
    const [session, setSession] = useState(null)
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.warn("error in getting session: ", error)
    } else {
      setSession(data.session)
      console.log(session)
    }
  }



  return (
    <>
      <Notes />
    </>
  )
}

export default App
