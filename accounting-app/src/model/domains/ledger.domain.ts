import { BalanceType, SearchResult } from "./types"

/**
 * Types for Ledger
 */
export type LedgerSearch = {
    type? : BalanceType,
    deleted? : boolean | ""
    code? : string
    keyword? : string
} 

export type LedgerEditForm = {
    type : BalanceType
    name : string
    description : string
}

export type LedgerInfo = {
    code : string
    name: string
    type : BalanceType,
    description : string
    createdAt : string
    modifiedAt : string
    deleted : boolean
}

export type LedgerSearchResult = SearchResult<LedgerInfo>

export type LedgerDetails = {
    total : {
        monthly : number
        yearly : number
        all : number
    }, 
    
} & LedgerInfo
