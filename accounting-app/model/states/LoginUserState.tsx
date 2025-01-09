"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { createContext, useContext, useEffect, useState } from "react"

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
    const router = useRouter()

    // Restore User from Local Storage
    useEffect(() => {
        const userData = localStorage.getItem(userKey)
        if(userData) {
            setUser(JSON.parse(userData))
        }
    }, []) 

    // Save User to Local Storage
    useEffect(() => {
        if(user) {
            localStorage.setItem(userKey, JSON.stringify(user))
            router.push("/")
        } else {
            localStorage.removeItem(userKey)
        }
    }, [user])

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
const userKey = 'com.jdc.balance.react.user'

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
