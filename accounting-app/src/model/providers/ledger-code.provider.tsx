'use client'
import { createContext, useContext, useState } from "react"
import { ProviderParam } from "../domains/types"

type LedgerCodeContextType = {
    ledgerCode? : string
    setLedgerCode : (ledgerCode? : string) => void
}

const LedgerCodeContext = createContext<LedgerCodeContextType | undefined>(undefined)

function LedgerCodeProvider({children} : ProviderParam) {
    const [ledgerCode, setLedgerCode] = useState<string>()

    return (
        <LedgerCodeContext.Provider value={{ledgerCode, setLedgerCode}}>
            { children }
        </LedgerCodeContext.Provider>
    )
}

function useLedgerCode() {
    const context = useContext(LedgerCodeContext)
    if(!context) {
        throw new Error("Invalid usage of Ledger Code Context.")
    }
    return context
}

export {LedgerCodeProvider , useLedgerCode}