import { LedgerSearch, LedgerInfo, LedgerEditForm, LedgerDetails } from "../domains/ledger.domain";
import { LEDGER } from "./utils";

export async function searchLedger(form : LedgerSearch) : Promise<LedgerInfo[]> {
    return LEDGER
}

export async function createLedger(form : LedgerEditForm) : Promise<{code : string}> {
    return {code : '0001'}
}

export async function updateLedger(code : string, form : LedgerEditForm) : Promise<{code : string}> {
    return {code : '0001'}
}

export async function findLedgerByCode(code : string) : Promise<LedgerInfo> {
    return LEDGER[0]
}