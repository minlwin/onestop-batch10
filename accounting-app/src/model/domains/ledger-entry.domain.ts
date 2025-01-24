import { BalanceType, PageSearch, SearchResult } from "./types"

/**
 * Types for Ledger Entry
 */
export type LedgerEntrySearch = {
    type? : BalanceType,
    code? : string, 
    dateForm? : string
    dateTo? : string
    keyword? : string
} & PageSearch

export type LedgerEntryInfo = {
    id : string
    type: BalanceType
    useDate : string
    issueAt : string
    ledgerCode : string
    ledgerName : string
    particular : string
    amount : number
    lastBalance : number
}

export type LedgerEntrySearchResult = SearchResult<LedgerEntryInfo>


/**
 * Ledger Entry Details
 */
export type LedgerEntryItem = {
    itemName : string
    quantity : number
    unitPrice : number
    total : number
}

export type LedgerEntryDetails = {items : LedgerEntryItem[]} & LedgerEntryInfo 

export type LedgerEntryForm = {
    ledgerCode : string
    particular : string
    useDate : string
    items : Partial<LedgerEntryItem> []
}

export type LedgerEntryModificationResult = {
    id : {
        code : string
        [key : string] : any
    }
}