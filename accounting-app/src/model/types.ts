import { Pager } from "@/components/pagination"

export type BalanceType = 'Debit' | 'Credit'
export const BalanceTypes = ['Debit', 'Credit']

export type SignInForm = {
    email: string
    password: string
}

export type SignUpForm = {
    name: string
    phone: string
    email: string
    password: string
}

export type PathParam<T> = {params: Promise<T>}

export type LayoutParam = {
    children:Readonly<React.ReactNode>
}

export type ProviderParam = LayoutParam

type PageSearch = {
    page?:number
    size?:number
}

export type SearchResult<T> = {
    contents: T[]
} & Pager

/**
 * Types for Balance Report
 */
export type BalanceSearch = {
    dateFrom?:string
    dateTo?:string
} & PageSearch

export type BalanceInfo = {
    id:string
    issueAt:string
    type:BalanceType
    ledgerCode:string
    ledgerName:string
    particular:string
    debit:number
    credit:number
    balance:number
}

export type BalanceSearchResult = SearchResult<BalanceInfo>

/**
 * Types for Ledger Entry
 */
export type LedgerEntrySearch = {
    type: BalanceType,
    dateForm?: string
    dateTo? : string
    keyword? : string
} & PageSearch

export type LedgerEntryInfo = {
    id:string
    type: BalanceType
    issueAt:string
    ledgerCode:string
    ledgerName:string
    particular:string
    amount:number
    lastBalance:number
}

export type LedgerEntrySearchResult = SearchResult<LedgerEntryInfo>

/**
 * Types for Ledger
 */
export type LedgerSearch = {
    type?: BalanceType,
    deleted?: boolean | ""
    code?: string
    keyword?: string
} 

export type LedgerEditForm = {
    type: BalanceType
    name: string
    description: string
}

export type LedgerInfo = {
    code: string
    name: string
    type: BalanceType,
    description: string
    createdAt: string
    modifiedAt: string
    deleted: boolean
}

export type LedgerSearchResult = SearchResult<LedgerInfo>

export type LedgerDetails = {
    total : {
        monthly : number
        yearly : number
        all : number
    }, 
    
} & LedgerInfo

/**
 * Ledger Entry Details
 */
export type LedgerEntryItem = {
    seqNumber: number
    itemName: string
    quantity: number
    unitPrice: number
    description: string
}

export type LedgerEntryDetails = {items : LedgerEntryItem[]} & LedgerEntryInfo 