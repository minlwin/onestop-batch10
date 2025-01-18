'use client'
import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import SubTitle from "@/components/sub-title";
import { TableView } from "@/components/table-view";
import { findLedgerByCode } from "@/model/clients/ledger-client";
import { searchLedgerEntry } from "@/model/clients/ledger-entry-client";
import { LedgerEntrySearch } from "@/model/domains/ledger-entry.domain";
import { LedgerInfo } from "@/model/domains/ledger.domain";
import { useLedgerCode } from "@/model/providers/ledger-code.provider";
import { LedgerEntryResultProvider, useLedgerEntrySearchResult } from "@/model/providers/ledger-entry-search-result.provider";
import { Button, Card, TextInput } from "flowbite-react";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { PiBookOpen, PiCalendar, PiCalendarCheck, PiPencil } from "react-icons/pi";

export default function Page({params} : {params : Promise<{id : string}>}) {
    
    const { id } = use(params)
    const { setLedgerCode } = useLedgerCode()

    useEffect(() => setLedgerCode(id), [id])

    return (
        <>
            <PageTitle title="Ledger Details" />
            <div className="flex mt-3 gap-8">
                <Ledger />
                <div className="flex-grow">
                    <LedgerEntryResultProvider>
                        <EntrySearch />
                        <EntryList />
                    </LedgerEntryResultProvider>
                </div>
            </div>
        </>
    )
}

function Ledger() {

    const { ledgerCode } = useLedgerCode()
    const [ledger, setLedger] = useState<LedgerInfo>()

    useEffect(() => {
        if(ledgerCode) {
            const load = async () => {
                const response = await findLedgerByCode(ledgerCode)
                setLedger(response)
            }

            load()
        }
    }, [ledgerCode])

    return (
        <section className="w-1/4">
            <Card>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-4">
                        <PiBookOpen size={36} />
                        <div>
                            <span className="block text-xl">{ledger?.code} {ledger?.type}</span>
                            <span className="block text-xl">{ledger?.name}</span>
                            <span className="block">{ledger?.deleted ? "Deleted" : "Active"}</span>
                            <span className="block">{ledger?.description}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <PiCalendar size={36} />
                        <div>
                            <span className="block text-sm text-gray-500">Created At</span>
                            <span className="block text-xl">{ledger?.createdAt}</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <PiCalendarCheck size={36} />
                        <div>
                            <span className="block text-sm text-gray-500">Modified At</span>
                            <span className="block text-xl">{ledger?.modifiedAt}</span>
                        </div>
                    </div>

                    <Button>
                        <Link href={`/member/ledger/1/edit`} className="flex gap-1 items-center" >
                            <PiPencil /> Edit Ledger
                        </Link>
                    </Button>
                </div>

            </Card>
        </section>
    )
}

function EntrySearch() {

    const { ledgerCode } = useLedgerCode()
    const { register, handleSubmit, setValue, getValues } = useForm<LedgerEntrySearch>()
    const { setResult }= useLedgerEntrySearchResult()

    useEffect(() => {
        setValue('code', ledgerCode)

        const load = async () => {
            search(getValues())
        } 

        load()
    }, [ledgerCode, setValue, getValues])

    const search = async (formData : LedgerEntrySearch) => {
        console.log(formData)
        const response = await searchLedgerEntry(formData)
        setResult(response)
    }

    return (
        <>
            <SubTitle title="Ledger Entry" />        
            <form onSubmit={handleSubmit(search)} className="search-form w-full">
                
                <FormGroup label="Date From" className="w-1/5">
                    <TextInput type="date" {...register('dateForm')} />
                </FormGroup>
                
                <FormGroup label="Date To" className="w-1/5">
                    <TextInput type="date" {...register('dateTo')} />
                </FormGroup>
                
                <FormGroup label="Keyword" className="w-1/4">
                    <TextInput {...register('keyword')} placeholder="Search Keyword" />
                </FormGroup>

                <div className="btn-wrapper">
                    <Button type="submit">
                        <div className="flex items-center gap-2">
                            <BiSearch /> Search
                        </div>
                    </Button>
                </div>

            </form>
        </>
    )
}

function EntryList() {
    const { result } = useLedgerEntrySearchResult()
    return (
        <>
        {result && 
            <TableView columns={COLUMNS} rows={result?.contents || []} />
        }
        </>
    )
}

const COLUMNS = [
    {
        name : "ID",
        fieldName: "id",
    },
    {
        name : "Issue At",
        fieldName: "issueAt",
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
]