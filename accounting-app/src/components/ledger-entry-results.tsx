'use client'

import { useLedgerEntrySearchResult } from "@/model/providers/ledger-entry-search-result.provider"
import { AppTableColumn, TableView } from "./table-view"

export default function LedgerEntryResults() {
    const {result} = useLedgerEntrySearchResult()
    return (
        <TableView columns={COLUMNS} rows={result?.contents || []} />
    )
}

const COLUMNS : AppTableColumn[] = [
    { name : "ID", fieldName: "code" },
    { name : "Issue At", fieldName: "issueAt" },
    { name : "Ledger Code", fieldName: "ledgerCode" },
    { name : "Ledger Name", fieldName: "ledgerName" },
    { name : "Particular", fieldName: "particular" },
    { name : "Amount", fieldName: "amount", className: 'text-end' },
    { fieldName: "code", link: (id) => `/member/balance/${id}` },
]