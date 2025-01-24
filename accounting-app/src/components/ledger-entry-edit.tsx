'use client'
import { LedgerEntryForm, LedgerEntryItem } from "@/model/domains/ledger-entry.domain"
import { useEffect, useState } from "react"
import { FieldArrayWithId, useFieldArray, useForm, UseFormReturn } from "react-hook-form"
import FormGroup from "./form-group"
import { Button, Card, Select, Textarea, TextInput } from "flowbite-react"
import { LedgerInfo } from "@/model/domains/ledger.domain"
import { searchLedger } from "@/model/clients/ledger-client"
import SubTitle from "./sub-title"
import { PiPlus, PiTrash } from "react-icons/pi"
import { BiSave } from "react-icons/bi"
import { BalanceType } from "@/model/domains/types"
import { createLedgerEntry, updateLedgerEntry } from "@/model/clients/ledger-entry-client"
import { useRouter } from "next/navigation"
import { findBalanceById } from "@/model/clients/balance-client"

export type LedgerEntry = Partial<{
    id : string
    type : BalanceType
}>

export default function LedgerEntryEdit({id, type} : LedgerEntry) {

    const router = useRouter()
    const [ledgers, setLedgers] = useState<LedgerInfo[]>([])

    const form = useForm<LedgerEntryForm>({
        defaultValues: {
            ledgerCode: '',
            useDate: '',
            particular: '',
            items: [
                {itemName : '', unitPrice : 0, quantity : 0}
            ]
        }
    })

    const { append, remove, fields } = useFieldArray({
        control: form.control,
        name : "items"
    })

    const addItem = (item? : LedgerEntryItem) => {
        append(item || {
            itemName : '',
            unitPrice : 0,
            quantity : 0,
            total: 0
        })
    }

    const removeItem = (index:number) => {
        remove(index)
        if(form.getValues().items.length == 0) {
            addItem()
        }
    }

    useEffect(() => {
        const loadLedgers = async (type : BalanceType) => {
            const response = await searchLedger({type : type})
            setLedgers(response)
        }
        
        if(type) {
            loadLedgers(type)
        }
        if(id) {
            const load = async () => {
                const response = await findBalanceById(id)

                if(response) {
                    await loadLedgers(response.type)

                    form.setValue('ledgerCode', response.ledgerCode)
                    form.setValue('useDate', response.useDate)
                    form.setValue('particular', response.particular)
    
                    form.setValue('items', [])
                    response.items.forEach(item => addItem(item))    
                }
            }
            load()
        }
    }, [])

    const save = async (formData:LedgerEntryForm) => {
        const result = id ? await updateLedgerEntry(id, formData) 
            : await createLedgerEntry(formData)
        router.replace(`/member/balance/${result.id.code}`)
    }

    const setTotal = (index : number) => {
        const quantity = form.getValues('items')[index].quantity || 0
        const unitPrice = form.getValues('items')[index].unitPrice || 0
        form.setValue(`items.${index}.total`, quantity * unitPrice)
    }

    return (
        <form onSubmit={form.handleSubmit(save)} className="mt-3" >

            <div className="flex gap-8 items-start">

                <Card className="w-1/4">
                    <FormGroup label="Ledger">
                        <Select {...form.register('ledgerCode', {
                            required : 'Select Ledger',
                        })}>
                            <option value="">Select Ledger</option>
                            {ledgers.map((item) => (
                                <option key={item.code} value={item.code} >{item.name}</option>
                            ))}
                        </Select>
                        { form.formState.errors.ledgerCode && <span className="error">{form.formState.errors.ledgerCode.message}</span>}
                    </FormGroup>

                    <FormGroup label="Use Date">
                        <TextInput type="date" {...form.register('useDate', {
                            required : "Enter Use Date"
                        })} />
                        { form.formState.errors.useDate && <span className="error">{form.formState.errors.useDate.message}</span>}
                        </FormGroup>

                    <FormGroup label="Particular">
                        <Textarea placeholder="Enter Particular Information" rows={4}
                        {...form.register('particular', {
                            required : "Enter Particular Message"
                        })} />
                        { form.formState.errors.particular && <span className="error">{form.formState.errors.particular.message}</span>}
                    </FormGroup>
                </Card>
                
                <section className="flex-grow">
                    <SubTitle title="Entry Items" />
                    
                    <div className="flex gap-4 mt-4 mb-1">
                        <label className="w-2/6 text-sm text-gray-400">Item Name</label>
                        <label className="w-1/6 text-sm text-gray-400">Unit Price</label>
                        <label className="w-1/6 text-sm text-gray-400">Quantity</label>
                        <label className="w-1/6 text-sm text-gray-400">Total</label>
                    </div>
                    {fields.map((item, index) => (
                        <FormItems form={form} item={item} index={index} key={item.id} removeItem={removeItem} setTotal={setTotal} />
                    ))}

                    <div className="flex gap-2">
                        <Button type="button" onClick={() => addItem()}>
                            <div className="flex gap-1 items-center">
                                <PiPlus /> Add Item
                            </div>
                        </Button>

                        <Button type="submit">
                            <div className="flex gap-1 items-center">
                                <BiSave /> Save Entry
                            </div>
                        </Button>
                    </div>
                </section>
                
            </div>
        </form>
    )
}

function FormItems({form, item, index, setTotal, removeItem} : {
    form : UseFormReturn<LedgerEntryForm, any, undefined>,
    item : FieldArrayWithId<LedgerEntryForm, "items", "id">,
    index : number,
    setTotal : (index : number) => void
    removeItem : (index : number) => void
}) {
    return (
        <div key={item.id} className="flex gap-4 mb-4">
            <div className="w-2/6" >
                <TextInput type="text" {...form.register(`items.${index}.itemName` as const, {
                    required : 'Enter Item Name.'
                })}/>
                {form.formState.errors.items?.[index]?.itemName && <span className="error">{form.formState.errors.items?.[index]?.itemName?.message}</span> }
            </div>

            <div className="w-1/6" >
                <TextInput type="number" {...form.register(`items.${index}.unitPrice` as const, {
                    validate : notZero('Unit Price'),
                    onChange : (_) => setTotal(index)
                })} />
                {form.formState.errors.items?.[index]?.unitPrice && <span className="error">{form.formState.errors.items?.[index]?.unitPrice?.message}</span> }
            </div>

            <div className="w-1/6">
                <TextInput type="number" {...form.register(`items.${index}.quantity` as const, {
                    validate : notZero('Quantity'),
                    onChange : (_) => setTotal(index)
                })}/>
                {form.formState.errors.items?.[index]?.quantity && <span className="error">{form.formState.errors.items?.[index]?.quantity?.message}</span> }
            </div>

            <TextInput type="number" className="w-1/6" readOnly {...form.register(`items.${index}.total` as const)}/>

            <div>
                <Button className="w-full" onClick={() => removeItem(index)}>
                    <div className="flex gap-1 items-center">
                        <PiTrash /> Remove
                    </div>
                </Button>
            </div>
        </div>
    )
}


function notZero(fieldName : string): (value : number | undefined) => string | undefined {
    return (value) => {
        if(!value) {
            return `Enter ${fieldName}`
        }
    }
}