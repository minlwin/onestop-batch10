'use client'

import { useLedgerEntrySearchResult } from "@/model/providers/ledger-entry-search-result.provider"
import { TableView, TableViewModel } from "./table-view"
import { LedgerEntryInfo } from "@/model/types"

export default function LedgerEntryResults() {

    const {result} = useLedgerEntrySearchResult()

    return (
        <TableView model={getTableViewModel(result?.contents)} />
    )
}

function getTableViewModel(contents?:LedgerEntryInfo[]):TableViewModel {
    return {
        columns: [
            {
                name : "ID",
                fieldName: "id",
            },
            {
                name : "Issue At",
                fieldName: "issueAt",
            },
            {
                name : "Ledger Code",
                fieldName: "ledgerCode",
            },
            {
                name : "Ledger Name",
                fieldName: "ledgerName",
            },
            {
                name : "Particular",
                fieldName: "particular",
            },
            {
                name : "Amount",
                fieldName: "amount",
                className: 'text-end'
            },
            {
                fieldName: "id",
                link: (id:string) => `/member/balance/${id}`
            },
        ],
        rows: contents ?? []
    }
}