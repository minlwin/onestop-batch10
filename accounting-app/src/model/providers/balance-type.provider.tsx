'use client'

import { createContext, useContext, useState } from "react"
import { BalanceType, ProviderParam } from "../types"

type BalanceTypeContextType = {
    type?: BalanceType
    setType(type?: BalanceType):void
}
const BalanceTypeContext = createContext<BalanceTypeContextType | undefined>(undefined)

function BalanceTypeProvider({children}: ProviderParam) {
    const [type, setType] = useState<BalanceType | undefined>()
    return (
        <BalanceTypeContext.Provider value={{type, setType}} >
            {children}
        </BalanceTypeContext.Provider>
    )
}

function useBalanceType() {
    const context = useContext(BalanceTypeContext)
    if(!context) {
        throw Error("Invalid usage of Balance Result Context.")
    }
    return context
}

export {BalanceTypeProvider, useBalanceType}