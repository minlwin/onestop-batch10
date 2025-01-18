'use client'
import { createContext, useContext, useState } from "react"
import { ProviderParam } from "../domains/types"

type MemberIdContextType = {
    memberId? : string
    setMemberId : (memberId? : string) => void
}

const MemberIdContext = createContext<MemberIdContextType | undefined>(undefined)

function MemberIdProvider({children} : ProviderParam) {
    const [memberId, setMemberId] = useState<string>()

    return (
        <MemberIdContext.Provider value={{memberId, setMemberId}}>
            {children}
        </MemberIdContext.Provider>
    )
}

function useMemberId() {
    const context = useContext(MemberIdContext)
    if(!context) {
        throw new Error("Invalid usage for Member Id Context.")
    }
    return context
}

export {MemberIdProvider, useMemberId}