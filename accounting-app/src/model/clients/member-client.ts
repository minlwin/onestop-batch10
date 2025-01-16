import { MemberSearch, MemberSearchResult } from "../domains/member.domain";
import { MEMBERS } from "./utils";

export async function searchMember(form : MemberSearch):Promise<MemberSearchResult> {
    return {
        contents : MEMBERS,
        currentPage: 0,
        totalItems: 1,
        totalPages: 1,
        links: [0]
    }
}