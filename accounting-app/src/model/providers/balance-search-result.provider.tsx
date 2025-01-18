'use client'

import { createContext, useContext, useState } from "react"
import { ProviderParam } from "../domains/types"
import { BalanceSearchResult } from "../domains/balances.domain"

type BalanceResultContextType = {
    result?: BalanceSearchResult
    setResult(result?: BalanceSearchResult):void
}
const BalanceResultContext = createContext<BalanceResultContextType | undefined>(undefined)

function BalanceResultProvider({children}: ProviderParam) {
    const [result, setResult] = useState<BalanceSearchResult | undefined>()
    return (
        <BalanceResultContext.Provider value={{result, setResult}} >
            {children}
        </BalanceResultContext.Provider>
    )
}

function useBalanceResult() {
    const context = useContext(BalanceResultContext)
    if(!context) {
        throw Error("Invalid usage of Balance Result Context.")
    }
    return context
}

export {BalanceResultProvider, useBalanceResult}