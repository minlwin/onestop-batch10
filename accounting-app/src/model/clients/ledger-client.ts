import { LedgerDetails, LedgerEditForm, LedgerInfo, LedgerSearch } from "../types";
import { LEDGER } from "./utils";

export async function searchLedger(form : LedgerSearch) : Promise<LedgerInfo[]> {
    return LEDGER
}

export async function createLedger(form : LedgerEditForm) : Promise<string> {
    return '0001'
}

export async function updateLedger(code : string, form : LedgerEditForm) {
    return '0001'
}

export async function findLedgerByCode(code : string) : Promise<LedgerDetails> {
    const ledgerInfo = LEDGER.pop()!
    return {
        ... ledgerInfo,
        total : {
            monthly : 100000,
            yearly : 1200988,
            all : 3200988
        }
    }
}