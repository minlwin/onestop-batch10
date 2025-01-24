'use client'
import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import { createLedger, findLedgerByCode, updateLedger } from "@/model/clients/ledger-client";
import { LedgerEditForm } from "@/model/domains/ledger.domain";
import { BalanceTypes } from "@/model/domains/types";
import { Button, Select, Textarea, TextInput } from "flowbite-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { BiSave } from "react-icons/bi";

export default function Page({params} : {params : Promise<{id : string}>} ) {
    
    const {id} = use(params)
    const title = useMemo(() => id == 'create' ? 'Create Ledger' : 'Edit Ledger', [id])
    const router = useRouter()

    const {
        register, 
        handleSubmit,
        setValue,
        formState : { errors }
    } = useForm<LedgerEditForm>()

    useEffect(() => {
        if(id != 'create') {
            const loadData = async () => {
                const {type, name, description} = await findLedgerByCode(id)
                setValue('type', type)
                setValue('name', name)
                setValue('description', description)
            }
            loadData()
        }
    }, [id])

    const save = async (formData : LedgerEditForm) => {
        const result = (id === 'create') 
            ? await createLedger(formData)
            : await updateLedger(id, formData)

        router.replace(`/member/ledger/${result.id.code}/details`)
    }

    return (
        <>
            <PageTitle title={title} />

            <form onSubmit={handleSubmit(save)} className="grid grid-cols-4 gap-4 w-3/4 mt-3">
                <FormGroup label="Balance Type">
                    <Select {...register('type', {
                        required: "Please select ledger type."
                    })}>
                        <option value="">Select One</option>
                        {BalanceTypes.map((data, index) => (
                            <option key={index} value={data}>{data}</option>
                        ))}
                    </Select>
                    <span className="text-xs text-gray-600">
                        {errors.type?.message}
                    </span>
                </FormGroup>

                <FormGroup className="col-span-2" label="Ledger Name">
                    <TextInput type="text" placeholder="Enter Ledger Name" {...register('name', {
                        required : "Please enter ledger name."
                    })} />
                    <span className="text-xs text-gray-600">
                        {errors.name?.message}
                    </span>
                </FormGroup>

                <FormGroup className="col-start-1 col-span-4" label="Description">
                    <Textarea {...register('description')} placeholder="Description of Ledger."></Textarea>
                </FormGroup>

                <div className="pt-1">
                    <Button type="submit" >
                       <div className="flex items-center gap-1">
                            <BiSave /> Save Ledger
                       </div>
                    </Button>
                </div>
            </form>
        </>
    )
}