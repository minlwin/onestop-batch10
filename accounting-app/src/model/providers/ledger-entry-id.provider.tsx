'use client'

import { createContext, useContext, useState } from "react"
import { ProviderParam } from "../types"

type LedgerEntryIdContextType = {
    id? : string
    setId : (id? : string) => void
}

const LedgerEntryIdContext = createContext<LedgerEntryIdContextType | undefined>(undefined)

function LedgerEntryIdProvider({children} : ProviderParam) {
    const [id, setId] = useState<string | undefined>()

    return (
        <LedgerEntryIdContext.Provider value={{id, setId}}>
            {children}
        </LedgerEntryIdContext.Provider>
    )
}

function useLedgerEntryId() {
    const context = useContext(LedgerEntryIdContext)
    if(!context) {
        throw new Error('Invalid useage of Ledger Entry Id Context.')
    }
    return context
}

export {LedgerEntryIdProvider, useLedgerEntryId}