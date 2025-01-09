"use client"

import axios from "axios"
import { createContext, useContext, useState } from "react"

export interface LoginUser {
    name:string
    email:string
    role:string
    accessToken:string
    refreshToken:string
}

interface LoginUserContextType {
    user?: LoginUser
    setUser: (user?:LoginUser) => void
}

const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined)

export const LoginUserProvider = ({children}:{children:React.ReactNode}) => {
    const [user, setUser] = useState<LoginUser | undefined>()

    // Restore User from Local Storage

    // Save User to Local Storage

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

const baseUrl = 'http://localhost:8080'
export const useApiClient = () => {

    const {user} = useLoginUser()

    const client = axios.create({
        baseURL: baseUrl
    })

    if(user) {
        client.defaults.headers.Authorization = user.accessToken
    } else {
        delete client.defaults.headers.Authorization
    }

    return client
}
