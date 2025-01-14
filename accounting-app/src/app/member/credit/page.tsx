'use client'
import PageTitle from "@/components/PageTitle";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import { useEffect } from "react";

export default function Page() {
    const {setActiveMenu} = useActiveMenu()

    useEffect(() => {
        setActiveMenu('Credits')
    }, [])

    return (
        <>
            <PageTitle title="Credit Management" />
        </>
    )
}