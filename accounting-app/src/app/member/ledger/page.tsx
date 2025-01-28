'use client'

import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import { AppTableColumn, TableView } from "@/components/table-view";
import { searchLedger } from "@/model/clients/ledger-client";
import { LedgerSearch } from "@/model/domains/ledger.domain";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import { LedgerMasterProvider, useLedgerMaster } from "@/model/providers/ledger-master.provider";
import { Button, Select, TextInput } from "flowbite-react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiPlus, BiSearch } from "react-icons/bi";

export default function Page() {
    const {setActiveMenu} = useActiveMenu()
    useEffect(() => {
        setActiveMenu('Ledgers')
    }, [])
    return (
        <>
            <PageTitle title="Ledger Management" />

            <LedgerMasterProvider>
                <SearchForm />
                <ResultList />
            </LedgerMasterProvider>
        </>
    )
}

function SearchForm() {
    const {register, handleSubmit, getValues} = useForm<LedgerSearch>()
    const {setList} = useLedgerMaster()

    const search = async (formData : LedgerSearch) => {
        const result = await searchLedger(formData)
        console.log(result)
        setList(result)
    }

    useEffect(() => {
        const load = async () => {
            await search(getValues())
        }
        load()
    }, [setList, getValues])

    return (
        <form onSubmit={handleSubmit(search)} className="flex gap-4 my-3">

            <FormGroup label="Status">
                <Select {...register('deleted')}>
                    <option value="">All Status</option>
                    <option value="false">Active</option>
                    <option value="true">Deleted</option>
                </Select>
            </FormGroup>

            <FormGroup label="Leder Code">
                <TextInput type="text" {...register('code')} placeholder="Search Ledger Code" />
            </FormGroup>

            <FormGroup label="Keyword">
                <TextInput type="text" {...register('keyword')} placeholder="Search Keyword" />
            </FormGroup>

            <div className="btn-wrapper flex gap-2">
                <Button type="submit" >
                    <div className="flex gap-1 items-center">
                        <BiSearch /> Search
                    </div>
                </Button>

                <Button>
                    <Link className="btn flex gap-1 items-center" href="/member/ledger/create/edit"> 
                        <BiPlus /> Add New Ledger
                    </Link>
                </Button>
            </div>
        </form>
    )
}

function ResultList() {
    const { list } = useLedgerMaster()
    return (
        <TableView columns={COLUMNS} rows={list} />
    )
}

const COLUMNS : AppTableColumn[] = [
    {fieldName : 'code', name : 'Ledger Code'}, 
    {fieldName : 'name', name : 'Ledger Name'}, 
    {fieldName : 'type', name : 'Ledger Type'}, 
    {fieldName : 'deleted', name : 'Status', convert: (value : any) => value[0] == true ? "Deleted" : "Active"}, 
    {fieldName : 'description', name : 'Description'}, 
    {fieldName : 'createdAt', name : 'Created At'}, 
    {fieldName : 'code', link : (id) => `/member/ledger/${id}/details`}, 
]