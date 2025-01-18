import { createContext, useContext, useState } from "react"
import { MemberSearchResult } from "../domains/member.domain"
import { ProviderParam } from "../domains/types"

type MemberSearchResultContextType = {
    result? : MemberSearchResult
    setResult : (result? : MemberSearchResult) => void
}

const MemberSearchResultContext = createContext<MemberSearchResultContextType | undefined>(undefined)

function MemberSearchResultProvider({children} : ProviderParam) {
    const [result, setResult] = useState<MemberSearchResult>()

    return (
        <MemberSearchResultContext.Provider value={{result, setResult}}>
            {children}
        </MemberSearchResultContext.Provider>
    )
}

function useMemberSearchResult() {
    const context = useContext(MemberSearchResultContext)
    if(!context) {
        throw new Error("Invalid usage of Member Search Result Context")
    }
    return context
}

export {MemberSearchResultProvider, useMemberSearchResult}