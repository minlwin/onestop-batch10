'use client'

import { useActiveMenu } from "@/model/states/ActiveMenuProvider"
import { useEffect } from "react"

export default function AdminHome() {

    const {setActiveMenu} = useActiveMenu()

    useEffect(() => setActiveMenu(undefined), [])

    return <h1>Admin Home</h1>
}