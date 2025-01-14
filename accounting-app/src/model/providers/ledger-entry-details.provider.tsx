'use client'

import { createContext, useContext, useState } from "react"
import { LedgerEntryDetails, ProviderParam } from "../types"

type LedgerEntryDetailsContextType = {
    details? : LedgerEntryDetails
    setDetails? : (details? : LedgerEntryDetails) => void
}

const LedgerEntryDetailsContext = createContext<LedgerEntryDetailsContextType | undefined>(undefined)

function LedgerEntryDetailsProvider({children} : ProviderParam) {
    const [details, setDetails] = useState<LedgerEntryDetails | undefined>()
    return (
        <LedgerEntryDetailsContext.Provider value={{details, setDetails}}>
            {children}
        </LedgerEntryDetailsContext.Provider>
    )
}

function useLedgerEntryDetails() {
    const context = useContext(LedgerEntryDetailsContext)
    if(!context) {
        throw new Error('Invalid context usage for Ledger Entry Details Context.')
    }
    return context
}

export {LedgerEntryDetailsProvider, useLedgerEntryDetails}