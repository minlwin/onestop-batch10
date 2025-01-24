import { PageSearch, SearchResult } from "./types"

export type MemberSearch = {
    activated? : boolean
    keyword? : string
} & PageSearch

export type MemberInfo = {
    id : string
    name : string
    phone : string
    email : string
    activated : boolean
    registeredAt : string
    modifiedAt : string
}

export type MemberSearchResult = SearchResult<MemberInfo>

export type MemberAccessSearch = {
    dateFrom? : string
    dateTo? : string
} & PageSearch

export type MemberAccessInfo = {
    id : string,
    accessAt : string,
    endAt : string,
    activity : string,
    status : string,
    message : string
}

export type MemberAccessSearchResult = SearchResult<MemberAccessInfo>

export type MemberStatusForm = {
    status : boolean
}