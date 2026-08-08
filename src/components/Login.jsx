import { useState } from "react";
import supabase from "./supabase";

function Login() {
    
    const [isSignIn, setIsSignIn] = useState(true)
    const [currentEmail, setCurrentEmail] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [isSubmitted, setIsSubmitted] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (isSignIn) {
            const {data, error} = await supabase.auth.signInWithPassword({email: currentEmail, password: currentPassword})
            if (error) {
                console.warn("there is an error ", error)
            }
        } else {
            const {data, error} = await supabase.auth.signUp({email: currentEmail, password: currentPassword})
            if (error) {
                console.warn("there is an error ", error)
            } else {
                setIsSubmitted(true)
            }
        }
        
    }

    const changeEmail = (e) => {
        setCurrentEmail(e.target.value)
    }

    const changePassword = (e) => {
        setCurrentPassword(e.target.value)
    }

    return (
        <div>
        {isSubmitted ? <div className="bg-green-100 w-80 mx-auto my-2">
            <p className="px-6 py-2">Please check your email to sign up!</p> 
        </div> : <></>}
            <form onSubmit={handleSubmit} className="flex flex-col items-center mb-5">
                <input onChange={changeEmail} className="w-120 mb-1 bg-gray-200 border-2  border-solid" type="email" placeholder="mrjayden6767@gmail.com" id="email"></input>
                <input onChange={changePassword} className="w-120 mb-1 bg-gray-200 border-2  border-solid" type="password" placeholder="Password" id="password"></input>
                <button className="px-3 mb-1 bg-slate-600 hover:bg-slate-500 rounded font-bold text-white" type="submit">{isSignIn ? "Sign in" : "Sign up"}</button> 
                <button onClick={() => {
                    setIsSignIn(prev => !prev)
                    setIsSubmitted(false)
                }} className="px-3 mb-1 bg-slate-600 hover:bg-slate-500 rounded font-bold text-white" type="button">{"Switch to " + (isSignIn ? "Sign up" : "Sign in")}</button> 
            </form>
        </div>
    )
}

export default Login