'use client'
import LedgerEntryResults from "@/components/ledger-entry-results";
import LedgerEntrySearchForm from "@/components/ledger-entry-search-form";
import PageTitle from "@/components/page-title";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import { useBalanceType } from "@/model/providers/balance-type.provider";
import { LedgerEntryResultProvider } from "@/model/providers/ledger-entry-search-result.provider";
import { PaginationProvider } from "@/model/providers/pagination.provider";
import { useEffect } from "react";

export default function Page() {
    const {setActiveMenu} = useActiveMenu()
    const {setType} = useBalanceType()
    
    useEffect(() => {
        setActiveMenu('Credits')
        setType('Credit')
    }, [])

    return (
        <LedgerEntryResultProvider>
            <PageTitle title="Credit Management" />
            <PaginationProvider>
                <LedgerEntrySearchForm />
                <LedgerEntryResults />
            </PaginationProvider>
        </LedgerEntryResultProvider>
    )
}