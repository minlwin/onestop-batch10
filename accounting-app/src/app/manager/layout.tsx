'use client'

import ActiveMenuProvider, { useActiveMenu } from "@/model/providers/active-menu.provider";
import { LayoutParam } from "@/model/domains/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect } from "react";
import { useAuthentication } from "@/model/stores/authentication-store";

export default function Layout({children}:LayoutParam) {
    return (
        <ActiveMenuProvider>
            <main>
                <NavBar />
                <section className="px-16 py-4">
                    {children}
                </section>
            </main>
        </ActiveMenuProvider>
    )
}

function NavBar() {

    const {activeMenu} = useActiveMenu()
    const router = useRouter()

    useEffect(() => {
        document.title = `ADMIN | ${activeMenu?.toUpperCase() || 'HOME'}`
    }, [activeMenu])

    const {setAuthentication} = useAuthentication()

    const signOut : MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault()
        setAuthentication(undefined)
        router.replace('/anonymous/signin')
    }

    return (
        <nav className="navbar">
            <Link className="navbar-brand" href={'/manager'}>
                Balance Manager
            </Link>

            <ul className="navbar-nav">
                <li>
                    <Link href={'/manager/members'} className={activeMenu === 'Members' ? 'active' : ''}>Member Management</Link>
                </li>
                <li>
                    <a href="#" onClick={signOut}>
                        Sign Out
                    </a>
                </li>
            </ul>
        </nav>
    )
}