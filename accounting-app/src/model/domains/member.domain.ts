import { SearchResult } from "../types"

export type MemberSearch = {
    activated? : boolean
    keyword? : string
}

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

export type MemberAccessInfo = {

}

export type MemberDetails = {

}