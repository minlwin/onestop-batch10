import { create } from "zustand"
import { AccountInfo } from "../domains/anonymous.domain"
import { createJSONStorage, persist } from "zustand/middleware"

type AuthenticationState = {
    authentication? : AccountInfo
}

type AuthenticationAction = {
    setAuthentication : (authentication? : AccountInfo) => void
}

export const useAuthentication = create(
    persist<AuthenticationState & AuthenticationAction>(
        (set) => ({
            authentication : undefined,
            setAuthentication : (auth) => {
                set(state => ({...state, authentication : auth}))
            }
        }),
        {
            name : 'com.jdc.accounting.auth',
            storage : createJSONStorage(() => localStorage)
        }
    )
)