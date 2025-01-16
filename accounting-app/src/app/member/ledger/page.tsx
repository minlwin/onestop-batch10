'use client'

import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import { AppTableColumn, TableView } from "@/components/table-view";
import { searchLedger } from "@/model/clients/ledger-client";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import { LedgerMasterProvider, useLedgerMaster } from "@/model/providers/ledger-master.provider";
import { LedgerSearch } from "@/model/types";
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
                {/* Search Form */}
                <SearchForm />
                {/* Result List */}
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
                <select {...register('deleted')}>
                    <option value="">All Status</option>
                    <option value="fase">Active</option>
                    <option value="true">Deleted</option>
                </select>
            </FormGroup>

            <FormGroup label="Leder Code">
                <input type="text" {...register('code')} placeholder="Search Ledger Code" />
            </FormGroup>

            <FormGroup label="Keyword">
                <input type="text" {...register('keyword')} placeholder="Search Keyword" />
            </FormGroup>

            <div className="btn-wrapper flex">
                <button type="submit" className="flex gap-1 items-center">
                    <BiSearch /> Search
                </button>

                <Link className="btn flex gap-1 items-center" href="/member/ledger/create/edit"> 
                    <BiPlus /> Add New Ledger
                </Link>
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
    {fieldName : 'deleted', name : 'Status', convert: (value : any) => value == true ? "Deleted" : "Active"}, 
    {fieldName : 'description', name : 'Description'}, 
    {fieldName : 'createdAt', name : 'Created At'}, 
    {fieldName : 'code', link : (id) => `/member/ledger/${id}/details`}, 
]