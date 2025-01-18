'use client'

import { createContext, useContext, useState } from 'react'
import { ProviderParam } from '../domains/types'
import { LedgerEntrySearchResult } from '../domains/ledger-entry.domain'

type LedgerEntryResultContextType = {
    result?: LedgerEntrySearchResult
    setResult(result?: LedgerEntrySearchResult) : void
}

const LedgerEntryResultContext = createContext<LedgerEntryResultContextType | undefined>(undefined)

function LedgerEntryResultProvider({children} : ProviderParam) {
    const [result, setResult] = useState<LedgerEntrySearchResult | undefined>()

    return (
        <LedgerEntryResultContext.Provider value={{result, setResult}}>
            {children}
        </LedgerEntryResultContext.Provider>
    )
}

function useLedgerEntrySearchResult() {
    const context = useContext(LedgerEntryResultContext)

    if(!context) {
        throw new Error("Invalid context usage for Ledger Entry Result.")
    }

    return context
}

export {LedgerEntryResultProvider, useLedgerEntrySearchResult}