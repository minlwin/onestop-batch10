'use client'
import PageTitle from "@/components/page-title";
import SubTitle from "@/components/sub-title";
import { AppTableColumn, TableView } from "@/components/table-view";
import { findBalanceById } from "@/model/clients/balance-client";
import { LedgerEntryDetails } from "@/model/domains/ledger-entry.domain";
import { PathParam } from "@/model/domains/types";
import { Button, Card } from "flowbite-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { PiPencil, PiShoppingCart } from "react-icons/pi";

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

            <div className="flex gap-8 my-4">

                <Card className="w-1/4">
                    <div className="flex gap-4">
                        <PiShoppingCart size={36} />

                        <div className="flex flex-col gap-4">
                            <div>
                                <div className="text-sm text-gray-500">Entry ID</div>
                                <div>{details?.id}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Ledger</div>
                                <div>{details?.type} {details?.ledgerCode}</div>
                                <div>{details?.ledgerName}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Particular</div>
                                <div>{details?.particular}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Amount</div>
                                <div>{details?.amount.toLocaleString()} MMK</div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex-grow">
                    <div className="mb-4">
                        <SubTitle title="Entry Items" />
                    </div>
                    <TableView columns={COLUMNS} rows={details?.items || []} footer={{
                        lable: {
                            name : "Total",
                            colSpan : 4
                        },
                        value : details?.amount,
                        className : 'text-end'
                    }} />

                    <div className="mt-4">
                        <Button>
                            <Link href={`/member/${details?.type.toLocaleLowerCase()}/${details?.id}`} className="flex items-center gap-1" >
                                <PiPencil /> Edit Entry
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

const COLUMNS : AppTableColumn [] = [
    { fieldName : 'seq' },
    { fieldName : 'itemName', name : 'Item' },
    { fieldName : 'unitPrice', name : 'Unit Price', className: 'text-end' },
    { fieldName : 'quantity', name : 'Quantity', className: 'text-end' },
    { fieldName : 'total', name : 'Total', className : 'text-end' },
]