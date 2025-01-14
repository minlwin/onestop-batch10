'use client'
import PageTitle from "@/components/page-title";
import { useBalanceType } from "@/model/providers/balance-type.provider";
import { LedgerEntryDetailsProvider } from "@/model/providers/ledger-entry-details.provider";
import { PathParam } from "@/model/types";
import { getEntryEditTitle } from "@/model/utils";
import { use, useEffect } from "react";

export default function Page({params}:PathParam<{id: string}>) {

    const {id} = use(params)
    const {type} = useBalanceType()

    useEffect(() => {
        // Load Data
    }, [id])

    return (
        <LedgerEntryDetailsProvider>
            <PageTitle title={getEntryEditTitle(id, type)} />
        </LedgerEntryDetailsProvider>
    )
}