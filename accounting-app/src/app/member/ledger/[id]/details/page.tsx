'use client'
import InfoItem from "@/components/info-item";
import PageTitle from "@/components/page-title";
import { findLedgerByCode } from "@/model/clients/ledger-client";
import { LedgerDetails } from "@/model/types";
import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import { BiPencil, BiTrash } from "react-icons/bi";

export default function Page({params} : {params : Promise<{id : string}>}) {
    
    const { id } = use(params)
    const [result, setResult] = useState<LedgerDetails>()
    
    useEffect(() => {
        const loadData = async() => {
            const response = await findLedgerByCode(id)
            console.log(`ID : ${id}`)
            console.log(response)
            setResult(response)
        }

        loadData()
    }, [id])
    
    const status = (value?:boolean) => value ? "Deleted" : "Active"

    return (
        <>
            <PageTitle title="Ledger Details" />
            
            <div className="my-3 grid grid-cols-3 gap-4 w-3/5">
                <InfoItem label="Type" value={result?.type || ''} />
                <InfoItem label="Code" value={result?.code || ''} />
                <InfoItem label="Name" value={result?.name || ''} />
                <InfoItem label="Status" value={status(result?.deleted)} />
                <InfoItem label="Created At" value={result?.createdAt || ''} />
                <InfoItem label="Modified At" value={result?.modifiedAt || ''} />
                <InfoItem label="Monthly Toal" value={result?.total.monthly.toLocaleString() || ''} />
                <InfoItem label="Yearly Total" value={result?.total.yearly.toLocaleString() || ''} />
                <InfoItem label="All Total" value={result?.total.all.toLocaleString() || ''} />
            </div>

            <div className="flex">
                <button className="flex items-center gap-1">
                    <BiTrash />
                    {result?.deleted ? 'Activated' : 'Delete'}
                </button>

                <Link href={`/member/ledger/${id}/edit`} className="btn flex items-center gap-1">
                    <BiPencil /> Edit Ledger
                </Link>
            </div>
        </>
    )
}
