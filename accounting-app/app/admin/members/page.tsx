'use client'

import { useActiveMenu } from "@/model/states/ActiveMenuProvider"
import { useEffect } from "react"

export default function MemberManagement() {
    const {setActiveMenu} = useActiveMenu()

    useEffect(() => {
        setActiveMenu('member')
    }, [])
    return (
        <>
            <h1>Member Management</h1>

            <div>
                <SearchForm />
            </div>

            <div>
                <ResultList />
            </div>
        </>
        
    )
}

function SearchForm() {
    return (
        <form action="">

        </form>
    )
}

function ResultList() {
    return (
        <table className=""></table>
    )
}