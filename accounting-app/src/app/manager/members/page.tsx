'use client'
import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import { AppTableColumn, TableView } from "@/components/table-view";
import { searchMember } from "@/model/clients/member-client";
import { MemberSearch } from "@/model/domains/member.domain";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import { MemberSearchResultProvider, useMemberSearchResult } from "@/model/providers/member-search-result.provider";
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";

export default function Page() {
    const {setActiveMenu} = useActiveMenu()
    useEffect(() => setActiveMenu('Members'), [])
    return (
        <MemberSearchResultProvider>
            <PageTitle title="Member Management" />
            <SearchForm />
            <ResultTable />
        </MemberSearchResultProvider>
    )
}

function SearchForm() {
    const {setResult} = useMemberSearchResult()
    const {register, handleSubmit} = useForm<MemberSearch>({
        defaultValues: {
            activated : undefined,
            keyword : ''
        }
    })
    
    const search = async (form : MemberSearch) => {
        const result = await searchMember(form)
        console.log(result)
        setResult(result)
    }

    useEffect(() => {
        const loadData = async () => {
            await search({})
        }
        loadData()
    }, [])
    
    return (
        <form onSubmit={handleSubmit(search)} className="search-form">
            <FormGroup label="Active State" className="w-1/6">
                <Select {...register('activated')}>
                    <option value="">All</option>
                    <option value="true">Activated</option>
                    <option value="false">Pending</option>
                </Select>
            </FormGroup>

            <FormGroup label="Keyword" className="w-1/5">
                <TextInput {...register('activated')} type="text" placeholder="Search Keyword" />
            </FormGroup>

            <div className="btn-wrapper">
                <Button type="submit">
                    <div className="flex items-center gap-1">
                        <BiSearch /> Search
                    </div>
                </Button>
            </div>
        </form>
    )
}

function ResultTable() {
    const {result} = useMemberSearchResult()
    return (
        <TableView columns={COLUMNS} rows={result?.contents || []} />
    )
}

const COLUMNS : AppTableColumn[] = [
    {
        fieldName : 'name',
        name : 'Name'
    },
    {
        fieldName : 'phone',
        name : 'Name'
    },
    {
        fieldName : 'email',
        name : 'Name'
    },
    {
        fieldName : 'activated',
        name : 'Status',
        convert: (key) => key[0] ? 'Activated' : 'Pending'
    },
    {
        fieldName : 'registeredAt',
        name : 'Registered At'
    },
    {
        fieldName : 'modifiedAt',
        name : 'Modified At'
    },
    {
        fieldName : 'id',
        link : (id) => `/manager/members/${id}`
    }
]