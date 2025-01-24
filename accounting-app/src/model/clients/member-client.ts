import { MemberAccessSearch, MemberAccessSearchResult, MemberInfo, MemberSearch, MemberSearchResult, MemberStatusForm } from "../domains/member.domain";
import { client } from "../utils";

export async function searchMember(form : MemberSearch) : Promise<MemberSearchResult> {
    return (await client.get<MemberSearchResult>('/members', {params: form})).data
}

export async function findMemberById(id : string) {
    return (await client.get<MemberInfo>(`/members/${id}`)).data
}

export async function updateMemberStatus(id : string, form : MemberStatusForm) {
    return (await client.put<MemberInfo>(`/members/${id}`, form)).data
}


export async function searchMemberAccess(id:string, form : MemberAccessSearch) : Promise<MemberAccessSearchResult> {
    return (await client.get<MemberAccessSearchResult>(`/members/${id}/access`, {params : form})).data
}