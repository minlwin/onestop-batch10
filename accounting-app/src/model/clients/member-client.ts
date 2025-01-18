import { MemberAccessSearch, MemberAccessSearchResult, MemberSearch, MemberSearchResult } from "../domains/member.domain";
import { MEMBER_ACCESSES, MEMBERS } from "./utils";

export async function searchMember(form : MemberSearch) : Promise<MemberSearchResult> {
    return {
        contents : MEMBERS,
        currentPage: 0,
        totalItems: 1,
        totalPages: 1,
        links: [0]
    }
}

export async function findMemberById(id : string) {
    return MEMBERS.filter(a => a.id === id)[0]
}

export async function searchMemberAccess(id:string, form : MemberAccessSearch) : Promise<MemberAccessSearchResult> {
    return {
        contents  : MEMBER_ACCESSES,
        currentPage: 0,
        totalItems: 1,
        totalPages: 1,
        links: [0]
    }
}