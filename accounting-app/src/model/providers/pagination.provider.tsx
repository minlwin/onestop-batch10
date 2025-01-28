import { createContext, useContext, useState } from "react"
import { ProviderParam } from "../domains/types"

type PaginationContextType = {
    page? : number
    setPage : (page? : number) => void
    size? : number
    setSize : (size? : number) => void
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined)

function PaginationProvider({children} : ProviderParam) {
    const [page, setPage] = useState<number | undefined>(0)
    const [size, setSize] = useState<number | undefined>(3)
    return (
        <PaginationContext.Provider value={{page, setPage, size, setSize}}>
            {children}
        </PaginationContext.Provider>
    )
}

function usePagination() {
    const context = useContext(PaginationContext)
    if(!context) {
        throw new Error('Invalid context usage for Pagination Context')
    }
    return context
}

export {PaginationProvider, usePagination}