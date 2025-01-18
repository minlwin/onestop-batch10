'use client'
import PageTitle from "@/components/page-title";
import { useBalanceType } from "@/model/providers/balance-type.provider";
import { PathParam } from "@/model/domains/types";
import { getEntryEditTitle } from "@/model/utils";
import { use, useMemo } from "react";
import LedgerEntryEdit from "@/components/ledger-entry-edit";

export default function Page({params}:PathParam<{id: string}>) {

    const {id} = use(params)
    const {type} = useBalanceType()
    const idParam = useMemo(() => id === 'create' ? undefined : id, [id])

    return (
        <>
            <PageTitle title={getEntryEditTitle(id, type)} />
            <LedgerEntryEdit id={idParam} type={type} />
        </>
    )
}