'use client'
import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import Pagination from "@/components/pagination";
import { AppTableColumn, TableView } from "@/components/table-view";
import { findMemberById, searchMemberAccess, updateMemberStatus } from "@/model/clients/member-client";
import { MemberAccessSearch, MemberAccessSearchResult, MemberInfo } from "@/model/domains/member.domain";
import { useDefaultPageResult } from "@/model/domains/types";
import { useMemberId } from "@/model/providers/member-id.provider";
import { PaginationProvider, usePagination } from "@/model/providers/pagination.provider";
import { Button, Card, ListGroup, ListGroupItem, TextInput } from "flowbite-react";
import { use, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearch } from "react-icons/bi";
import { PiCalendar, PiCheck, PiEnvelope, PiFlag, PiLock, PiPhone, PiShield, PiUser } from "react-icons/pi";

export default function Page({params} : {params : Promise<{id : string}>}) {
    
    const { id } = use(params)
    const { setMemberId } = useMemberId()

    useEffect(() => {
        setMemberId(id)
    }, [id, useMemberId])
    
    return (
        <>
            <PageTitle title="Member Details" />
            
            <div className="flex items-start gap-8 mt-4">
                <Profile />
                <PaginationProvider>
                    <AccessHistory  />
                </PaginationProvider>
            </div>
        </>
    )
}

function Profile() {

    const [profile, setProfile] = useState<MemberInfo>()
    const { memberId } = useMemberId() 

    useEffect(() => {
        const loadData = async () => {
            if(memberId) {
                const result = await findMemberById(memberId)
                setProfile(result)
            }
        } 
        loadData()
    }, [memberId])

    const updateStatus = async () => {
        if(profile) {
            const resp = await updateMemberStatus(profile.id, {
                status : !profile.activated
            })

            setProfile(resp)
        }
    }

    return (
        <Card id="profile" className="w-1/4" imgSrc="/profile.png">
            <ListGroup>
                <ListGroupItem>
                    <div className="flex items-center gap-2">
                        <PiUser /> { profile?.name }
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex items-center gap-2">
                        <PiPhone /> { profile?.phone }
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex items-center gap-2">
                        <PiEnvelope /> { profile?.email }
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex items-center gap-2">
                        <PiShield /> { profile?.activated ? 'Activated' : 'Pending' }
                    </div>
                </ListGroupItem>
                <ListGroupItem>
                    <div className="flex items-center gap-2">
                        <PiFlag /> { profile?.registeredAt }
                    </div>
                </ListGroupItem>
            </ListGroup>

            <Button onClick={updateStatus}>
                <div className="flex items-center gap-2">
                    {profile?.activated ? 
                    <><PiLock /> Suspend</> : 
                    <><PiCheck /> Activate</>}
                </div>
            </Button>
        </Card>
    )
}

function AccessHistory() {

    const [result, setResult] = useState<MemberAccessSearchResult>()
    const { contents, ...pager } = useMemo(() => result || useDefaultPageResult(), [result])
    const { memberId } = useMemberId() 
    const { register, handleSubmit, getValues, setValue } = useForm<MemberAccessSearch>({defaultValues : {
        page : 0,
        size : 10
    }}) 
    const { page, size } = usePagination()

    const search = async (formData : MemberAccessSearch) => {
        if(memberId) {
            const response = await searchMemberAccess(memberId, formData)
            setResult(response)
        }
    }

    useEffect(() => {
        search(getValues()) 
    }, [memberId, getValues])

    useEffect(() => {
        setValue('page', page)
        search(getValues()) 
    }, [page])

    useEffect(() => {
        setValue('page', 0)
        setValue('size', size)
        search(getValues()) 
    }, [size])

    return (
        <section className="h-full flex-grow">

            <h5 className="flex items-center gap-2 text-xl">
                <PiCalendar /> Access History
            </h5>

            <form onSubmit={handleSubmit(search)} className="search-form">
                <FormGroup className="w-1/5" label="Date From">
                    <TextInput type="date" {...register('dateFrom')} />
                </FormGroup>

                <FormGroup className="w-1/5" label="Date To">
                    <TextInput type="date" {...register('dateTo')} />
                </FormGroup>

                <div className="btn-wrapper">
                    <Button type="submit">
                        <div className="flex items-center gap-1">
                            <BiSearch /> Search
                        </div>
                    </Button>
                </div>
            </form>   

            <TableView columns={COLUMNS} rows={contents} />
            <Pagination pager={pager} />
        </section>
    )
}

const COLUMNS : AppTableColumn [] = [
    { fieldName : 'accessAt', name : "Access At" },
    { fieldName : 'endAt', name : "Finished At" },
    { fieldName : 'activity', name : "Activity" },
    { fieldName : 'status', name : "Status" },
    { fieldName : 'message', name : "Message" },
]