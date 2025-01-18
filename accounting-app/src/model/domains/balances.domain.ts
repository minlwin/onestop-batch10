import { BalanceType, PageSearch, SearchResult } from "./types"

/**
 * Types for Balance Report
 */
export type BalanceSearch = {
    dateFrom? : string
    dateTo? : string
} & PageSearch

export type BalanceInfo = {
    id : string
    issueAt : string
    useDate : string
    type : BalanceType
    ledgerCode : string
    ledgerName : string
    particular : string
    debit : number
    credit : number
    balance : number
}

export type BalanceSearchResult = SearchResult<BalanceInfo>

