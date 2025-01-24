'use client'

import { createContext, useContext, useState } from "react"
import { ProviderParam } from "../domains/types"

type SignUpResultContextType = {
    message? : string
    setMessage : (message : string) => void
}

const SignUpResultContext = createContext<SignUpResultContextType | undefined>(undefined)

function SignUpResultProvider({children} : ProviderParam) {
    const [message, setMessage] = useState<string>() 

    return (
        <SignUpResultContext.Provider value={{message, setMessage}}>
            {children}
        </SignUpResultContext.Provider>
    )
}

function useSignUpResult() {
    const context = useContext(SignUpResultContext)
    if(!context) {
        throw new Error('Invalid usage for Sign Up Result Context.')
    }
    return context
}

export {SignUpResultProvider, useSignUpResult}