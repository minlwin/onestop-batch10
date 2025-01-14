'use client'

import { useBalanceType } from "@/model/providers/balance-type.provider"
import { LedgerEntrySearch } from "@/model/types"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormGroup from "./form-group"
import { BiPlus, BiSearch } from "react-icons/bi"
import Link from "next/link"
import { useLedgerEntrySearchResult } from "@/model/providers/ledger-entry-search-result.provider"
import { searchLedgerEntry } from "@/model/clients/ledger-entry-client"

export default function LedgerEntrySearchForm() {

    const {register, handleSubmit, setValue, getValues} = useForm<LedgerEntrySearch>()
    const {type} = useBalanceType()
    const {setResult} = useLedgerEntrySearchResult()

    const search = async (form:LedgerEntrySearch) => {
        const result = await searchLedgerEntry(form)
        setResult(result)
    }

    useEffect(() => {
        if(type) {
            setValue('type', type)

            const load = async() => {
                const result = await searchLedgerEntry(getValues())
                setResult(result)
            }

            load()
        }
    }, [setResult, setValue, getValues, type])

    return (
        <form onSubmit={handleSubmit(search)} className="flex gap-4 py-3">
            <FormGroup label="Date From">
                <input type="date" {...register('dateForm')} />
            </FormGroup>
            <FormGroup label="Date To">
                <input type="date" {...register('dateTo')} />
            </FormGroup>
            <FormGroup label="Keyword" className="w-1/4">
                <input {...register('keyword')} placeholder="Search Keyword" />
            </FormGroup>

            <div className="btn-wrapper flex">
                <button type="submit">
                    <div className="flex items-center gap-2">
                        <BiSearch />
                        Search
                    </div>
                </button>

                <Link href={`${type?.toLocaleLowerCase()}/create`} className="btn">
                    <div className="flex items-center gap-2">
                        <BiPlus />
                        New Entry
                    </div>
                </Link>
            </div>
        </form>
    )
}