import { BalanceSearch, BalanceSearchResult } from "../domains/balances.domain";
import { LedgerEntryDetails } from "../domains/ledger-entry.domain";
import { client } from "../utils";

export async function searchBalance(form : BalanceSearch):Promise<BalanceSearchResult> {
    return (await client.get(`/balance`, {params : form})).data
}

export async function findBalanceById(id : string):Promise<LedgerEntryDetails> {
    return (await client.get(`/balance/${id}`)).data
}