import { Pager } from "@/components/pagination"

export type BalanceType = 'Debit' | 'Credit'
export const BalanceTypes = ['Debit', 'Credit']

export type Role = 'Admin' | 'Member'

export type PathParam<T> = {params: Promise<T>}

export type LayoutParam = {
    children : Readonly<React.ReactNode>
}

export type ProviderParam = LayoutParam

export type PageSearch = {
    page? : number
    size? : number
}

export type SearchResult<T> = {
    contents : T[]
} & Pager
