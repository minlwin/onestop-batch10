'use client'

import { useBalanceType } from "@/model/providers/balance-type.provider"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import FormGroup from "./form-group"
import { BiPlus, BiSearch } from "react-icons/bi"
import Link from "next/link"
import { useLedgerEntrySearchResult } from "@/model/providers/ledger-entry-search-result.provider"
import { searchLedgerEntry } from "@/model/clients/ledger-entry-client"
import { Button, TextInput } from "flowbite-react"
import { LedgerEntrySearch } from "@/model/domains/ledger-entry.domain"

export default function LedgerEntrySearchForm() {

    const {register, handleSubmit, setValue, getValues} = useForm<LedgerEntrySearch>()
    const {type} = useBalanceType()
    const {setResult} = useLedgerEntrySearchResult()

    const search = async (form:LedgerEntrySearch) => {
        const result = await searchLedgerEntry(form)
        console.log(result)
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
        <form onSubmit={handleSubmit(search)} className="search-form">
            <FormGroup label="Date From">
                <TextInput type="date" {...register('dateForm')} />
            </FormGroup>
            <FormGroup label="Date To">
                <TextInput type="date" {...register('dateTo')} />
            </FormGroup>
            <FormGroup label="Keyword" className="w-1/4">
                <TextInput {...register('keyword')} placeholder="Search Keyword" />
            </FormGroup>

            <div className="btn-wrapper flex gap-2">
                <Button type="submit">
                    <div className="flex items-center gap-2">
                        <BiSearch />
                        Search
                    </div>
                </Button>

                <Button>
                    <Link href={`${type?.toLocaleLowerCase()}/create`} className="btn">
                        <div className="flex items-center gap-2">
                            <BiPlus />
                            New Entry
                        </div>
                    </Link>
                </Button>
            </div>
        </form>
    )
}