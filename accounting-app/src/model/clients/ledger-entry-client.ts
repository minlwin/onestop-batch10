import { LedgerEntryForm, LedgerEntryModificationResult, LedgerEntrySearch, LedgerEntrySearchResult } from "../domains/ledger-entry.domain";
import { client } from "../utils";

export async function searchLedgerEntry(form:LedgerEntrySearch):Promise<LedgerEntrySearchResult> {
    return (await client.get('/entries', {params : form})).data
}

export async function createLedgerEntry(form : LedgerEntryForm) : Promise<LedgerEntryModificationResult> {
    return (await client.post('/entries', form)).data
}

export async function updateLedgerEntry(id : string, form : LedgerEntryForm) : Promise<LedgerEntryModificationResult> {
    return (await client.post(`/entries/${id}`, form)).data
}