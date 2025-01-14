import { LedgerEntrySearch, LedgerEntrySearchResult } from "../types";
import { LEDGER_ENTRIES } from "./utils";

export async function searchLedgerEntry(form:LedgerEntrySearch):Promise<LedgerEntrySearchResult> {
    return {
        contents: LEDGER_ENTRIES.filter(a => a.type === form.type),
        currentPage: 0,
        totalItems: 1,
        totalPages: 1,
        links: [0]
    }
}

export async function createLedgerEntry() {

}

export async function updateLedgerEntry() {
    
}