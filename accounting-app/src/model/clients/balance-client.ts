import { BalanceSearch, BalanceSearchResult } from "../domains/balances.domain";
import { LedgerEntryDetails } from "../domains/ledger-entry.domain";
import { BALANCES, ENTRIES } from "./utils";

export async function searchBalance(form : BalanceSearch):Promise<BalanceSearchResult> {
    return {
        contents: BALANCES,
        currentPage: 0,
        totalItems: 2,
        totalPages: 1,
        links: [0]
    }
}

export async function findBalanceById(id : string):Promise<LedgerEntryDetails> {
    return ENTRIES[0]
}