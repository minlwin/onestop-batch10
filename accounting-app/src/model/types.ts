export type BalanceType = 'Debit' | 'Credit'
export const BalanceTypes = ['Debit', 'Credit']

export type SignInForm = {
    email: string
    password: string
}

export type SignUpForm = {
    name: string
    phone: string
    email: string
    password: string
}

export type LayoutParam = {
    children:Readonly<React.ReactNode>
}

export type ProviderParam = LayoutParam