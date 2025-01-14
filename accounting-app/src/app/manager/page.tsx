'use client'
import PageTitle from "@/components/page-title";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import { useEffect } from "react";

export default function Page() {
    const {setActiveMenu} = useActiveMenu()
    useEffect(() => setActiveMenu(undefined), [])
    return (
        <>
            <PageTitle title="Admin Home" />
        </>
    )
}