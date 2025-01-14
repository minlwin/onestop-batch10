'use client'
import PageTitle from "@/components/page-title";
import { findBalanceById } from "@/model/clients/balance-client";
import { LedgerEntryDetails, PathParam } from "@/model/types";
import { use, useEffect, useState } from "react";

export default function Page({params}:PathParam<{id:string}>) {

    const {id} = use(params)
    const [details, setDetails] = useState<LedgerEntryDetails>()
    
    useEffect(() => {
        const load = async (id:string) => {
            const result = await findBalanceById(id)
            setDetails(result) 
            console.log(details)
        }

        load(id)
    }, [id])
   
    return (
        <>
            <PageTitle title={`${details?.type} Details`} />
        </>
    )
}