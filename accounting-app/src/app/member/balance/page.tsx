'use client'
import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import Pagination from "@/components/pagination";
import { AppTableColumn, TableView } from "@/components/table-view";
import { searchBalance } from "@/model/clients/balance-client";
import { BalanceSearch } from "@/model/domains/balances.domain";
import { BalanceType } from "@/model/domains/types";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import { BalanceResultProvider, useBalanceResult } from "@/model/providers/balance-search-result.provider";
import { PaginationProvider, usePagination } from "@/model/providers/pagination.provider";
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
            <PaginationProvider>
                <SearchForm />
                <ResultList />
            </PaginationProvider>
        </BalanceResultProvider>
    )
}

function SearchForm() {

    const form = useForm<BalanceSearch>({
        defaultValues: {
            page: 0,
            size: 10
        }
    })
    const {setResult} = useBalanceResult()
    const {page, size} = usePagination()
    
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

    useEffect(() => {
        form.setValue('page', page)
        const load = async () => {
            await search(form.getValues())
        }
        load()
    }, [page])

    useEffect(() => {
        form.setValue('page', 0)
        form.setValue('size', size)

        const load = async () => {
            await search(form.getValues())
        }
        load()
    }, [size])


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
    const [contents, pager] = useMemo(() => {
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
            {pager && <Pagination pager={pager} />}
        </>
    )
}

const COLUMNS : AppTableColumn[] = [
    { name : "ID", fieldName: "id" },
    { name : "Issue At", fieldName: "issueAt" },
    { name : "Type", fieldName: "type" },
    { name : "Ledger", fieldName: "ledgerCode,ledgerName", convert : (key) => `${key[0]} : ${key[1]}`  },
    { name : "Particular", fieldName: "particular" },
    { name : "Debit", fieldName: "debit", className: 'text-end' },
    { name : "Credit", fieldName: "credit", className: 'text-end' },
    { name : "Balance", fieldName: "type,lastBalance,credit,debit", className: 'text-end', convert : (key) => calculate(key[0], key[1], key[2], key[3]) },
    { fieldName: "id", link: (id:string) => `/member/balance/${id}` },
]

function calculate(type : BalanceType, lastBalnce : number, credit : number, debit : number) {
    console.log(`Balance Type  : ${type}`)
    console.log(`Last Balance  : ${lastBalnce}`)
    console.log(`Credit        : ${credit}`)
    console.log(`Debit         : ${debit}`)

    return type === 'Credit' ? (lastBalnce + credit) : (lastBalnce - debit)
}