import { LedgerEntryForm, LedgerEntrySearch, LedgerEntrySearchResult } from "../domains/ledger-entry.domain";
import { LEDGER_ENTRIES } from "./utils";

export async function searchLedgerEntry(form:LedgerEntrySearch):Promise<LedgerEntrySearchResult> {
    return {
        contents: LEDGER_ENTRIES.filter(a => {
            if(form.type && a.type === form.type) {
                return a
            }
            return a
        }),
        currentPage: 0,
        totalItems: 1,
        totalPages: 1,
        links: [0]
    }
}

export async function createLedgerEntry(form : LedgerEntryForm) : Promise<{id : string}> {
    return {
        id : "20250115-0001"
    }
}

export async function updateLedgerEntry(id : string, form : LedgerEntryForm) : Promise<{id : string}> {
    return {
        id : id
    }
}