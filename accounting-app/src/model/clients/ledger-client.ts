import { LedgerSearch, LedgerInfo, LedgerEditForm, LedgerModificationResult } from "../domains/ledger.domain";
import { client } from "../utils";

export async function searchLedger(form : LedgerSearch) : Promise<LedgerInfo[]> {
    return (await client.get<LedgerInfo[]>('/ledger', {params : form})).data
}

export async function createLedger(form : LedgerEditForm) : Promise<LedgerModificationResult> {
    return (await client.post('/ledger', form)).data
}

export async function updateLedger(code : string, form : LedgerEditForm) : Promise<LedgerModificationResult> {
    return (await client.put(`/ledger/${code}`, form)).data
}

export async function findLedgerByCode(code : string) : Promise<LedgerInfo> {
    return (await client.get(`/ledger/${code}`)).data
}