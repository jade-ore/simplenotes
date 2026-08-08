import { useState } from 'react'
import Login from './components/Login'
import supabase from './components/supabase'

function App() {
  
  const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.warn("error in getting session: ", error)
    } else {

    }
  }

  return (
    <>
      <Login />
    </>
  )
}

export default App
