'use client'
import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import { TableView } from "@/components/table-view";
import { searchBalance } from "@/model/clients/balance-client";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import { BalanceResultProvider, useBalanceResult } from "@/model/providers/balance-search-result.provider";
import { BalanceSearch } from "@/model/types";
import { Button, TextInput } from "flowbite-react";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

export default function Page() {
    const {setActiveMenu} = useActiveMenu()

    useEffect(() => {
        setActiveMenu('Balances')
    }, [])

    return (
        <BalanceResultProvider>
            <PageTitle title="Balance Report" />
            <SearchForm />
            <ResultList />
        </BalanceResultProvider>
    )
}

function SearchForm() {

    const form = useForm<BalanceSearch>()
    const {setResult} = useBalanceResult()
    
    const search = async (formData:BalanceSearch) => {
        const result = await searchBalance(formData)
        setResult(result)
    }

    useEffect(() => {
        const load = async () => {
            await search(form.getValues())
        }
        load()
    }, [form])

    return (
        <form className="search-form" onSubmit={form.handleSubmit(search)}>
            <FormGroup label="Date From">
                <TextInput type="date" {...form.register('dateFrom')} />
            </FormGroup>
            <FormGroup label="Date To">
                <TextInput type="date" {...form.register('dateTo')} />
            </FormGroup>
            <div className="btn-wrapper">
                <Button type="submit">
                    <div className="flex items-center gap-2">
                        <BiSearch />
                        Search
                    </div>
                </Button>
            </div>
        </form>
    )
}

function ResultList() {
    const {result} = useBalanceResult()
    const [contents, pagination] = useMemo(() => {
        if(result) {
            const {contents, ... pager} = result
            return [contents, pager]
        }
        return []
    }, [result])

    return (
        <>
            {/* Result Table */}
            <TableView columns={COLUMNS} rows={contents || []} />
            {/* Pagination */}
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
        name : "Type",
        fieldName: "type",
    },
    {
        name : "Ledger Code",
        fieldName: "ledgerCode",
    },
    {
        name : "Particular",
        fieldName: "particular",
    },
    {
        name : "Debit",
        fieldName: "debit",
        className: 'text-end'
    },
    {
        name : "Credit",
        fieldName: "credit",
        className: 'text-end'
    },
    {
        name : "Balance",
        fieldName: "balance",
        className: 'text-end'
    },
    {
        fieldName: "id",
        link: (id:string) => `/member/balance/${id}`
    },
]