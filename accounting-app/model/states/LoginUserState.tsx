"use client"

import { createContext, useContext, useState } from "react"

export interface LoginUser {
    name:string
    email:string
    role:string
    accessToken:string
    refreshToken:string
}

interface LoginUserContextType {
    user: LoginUser | null
    setUser: (user:LoginUser | null) => void
}

const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined)

export const LoginUserProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<LoginUser | null>(null)

    return (
        <LoginUserContext.Provider value={{user, setUser}}>
            {children}
        </LoginUserContext.Provider>
    )
}

export const useLoginUser = () => {
    const context = useContext(LoginUserContext)

    if(!context) {
        throw new Error("There is no login user context.")
    }

    return context
}
