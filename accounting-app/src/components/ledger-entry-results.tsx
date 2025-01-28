'use client'

import { useLedgerEntrySearchResult } from "@/model/providers/ledger-entry-search-result.provider"
import { AppTableColumn, TableView } from "./table-view"
import { useMemo } from "react"
import Pagination from "./pagination"
import { useDefaultPageResult } from "@/model/domains/types"

export default function LedgerEntryResults() {
    const { result } = useLedgerEntrySearchResult()
    const { contents, ... pager} = useMemo(() => result || useDefaultPageResult(), [result])
    return (
        <>
            <TableView columns={COLUMNS} rows={contents || []} />
            {pager && <Pagination pager={pager} />}
        </>
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