'use client'

import ActiveMenuProvider, { useActiveMenu } from "@/model/providers/active-menu.provider";
import { LayoutParam } from "@/model/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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

    const signOut = () => {
        router.replace('/anonymous/signin')
        return false
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