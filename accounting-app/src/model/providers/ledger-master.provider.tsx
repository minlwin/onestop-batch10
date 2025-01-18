'use client'
import { createContext, useContext, useState } from "react"
import { ProviderParam } from "../domains/types"
import { LedgerInfo } from "../domains/ledger.domain"

type LedgerMasterContextType = {
    list : LedgerInfo[]
    setList : (list : LedgerInfo[]) => void
}

const LedgerMasterContext = createContext<LedgerMasterContextType | undefined>(undefined)

function LedgerMasterProvider({children} : ProviderParam) {
    const [list, setList] = useState<LedgerInfo[]>([])

    return (
        <LedgerMasterContext.Provider value={{list, setList}}>
            {children}
        </LedgerMasterContext.Provider>
    )
}

function useLedgerMaster() {
    const context = useContext(LedgerMasterContext)
    if(!context) {
        throw new Error("Invalid context usage of Ledger Master Context.")
    }
    return context
}

export {LedgerMasterProvider, useLedgerMaster}