import { BalanceInfo, LedgerEntryDetails, LedgerEntryInfo } from "../types";

export const ENTRIES:LedgerEntryDetails[] = [
    {
        id: "20250114-00001",
        issueAt: '2025-01-14 10:00',
        type: 'Credit',
        ledgerCode: 'C0001',
        ledgerName: 'Maintenance Fees',
        particular: 'Maintenance for iPOS System',
        amount: 50000,
        lastBalance: 100000,
        items: [
            {
                seqNumber: 1,
                itemName: 'IC Chips',
                quantity: 4,
                unitPrice: 10000,
                description: 'EC101-001'
            },
            {
                seqNumber: 2,
                itemName: 'Transportation Fees',
                quantity: 2,
                unitPrice: 5000,
                description: 'Two way taxi fees'
            }
        ]
    },
    {
        id: "20250114-00002",
        issueAt: '2025-01-14 10:00',
        type: 'Debit',
        ledgerCode: 'D0001',
        ledgerName: 'Office Usage',
        particular: 'Purchase Stationary Accessories',
        amount: 25000,
        lastBalance: 150000,
        items: [
            {
                seqNumber: 1,
                itemName: 'A4 Paper',
                quantity: 4,
                unitPrice: 5000,
                description: '500 Sheet Pack'
            },
            {
                seqNumber: 2,
                itemName: 'Transportaion Fees',
                quantity: 1,
                unitPrice: 5000,
                description: 'Taxi for taking to office'
            },
        ]
    }
]

export const BALANCES:BalanceInfo[] = ENTRIES.map(entry => {
    const {lastBalance, items, ...rest} = entry
    return {
        ...rest, 
        debit: rest.type === 'Debit' ? rest.amount : 0,
        credit: rest.type === 'Credit' ? rest.amount : 0,
        balance : rest.type === 'Debit' ? lastBalance - rest.amount : lastBalance + rest.amount} as BalanceInfo
})



export const LEDGER_ENTRIES = BALANCES.map(data => {
    const {debit, credit, balance, type, ... commons} = data
    return {
        ...commons, 
        type : type, 
        amount : type === 'Credit' ? credit : debit
    } as LedgerEntryInfo 
})

