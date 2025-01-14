'use client'

import ActiveMenuProvider, { useActiveMenu } from "@/model/providers/active-menu.provider";
import { LayoutParam } from "@/model/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiDownArrow, BiLogOut, BiPieChart, BiTag, BiUpArrow } from "react-icons/bi";

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
        document.title = `BALANCE | ${activeMenu?.toUpperCase() || 'HOME'}`
    }, [activeMenu])

    const signOut = () => {
        router.replace('/anonymous/signin')
        return false
    }

    return (
        <nav className="navbar">
            <Link className="navbar-brand" href={'/member'}>
                My Balance
            </Link>

            <ul className="navbar-nav items-center">
                {MENUS.map((menu, index) => (
                    <li key={index}>
                        <Link href={menu.url} className={activeMenu === menu.name ? 'active' : ''} >
                            <div className="flex gap-1 flex-row items-center">
                                {menu.icon}
                                <span>{menu.name}</span>
                            </div>
                        </Link>
                    </li>
                ))}
                <li>
                    <a href="#" onClick={signOut}>
                        <div className="flex gap-1 flex-row items-center">
                            <BiLogOut />
                            Sign Out
                        </div>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

const MENUS:Menu[] = [
    {
        name: "Balances",
        url: "/member/balance",
        icon: <BiPieChart />
    },
    {
        name: "Debits",
        url: "/member/debit",
        icon: <BiDownArrow />
    },
    {
        name: "Credits",
        url: "/member/credit",
        icon: <BiUpArrow />
    },
    {
        name: "Ledgers",
        url: "/member/ledger",
        icon: <BiTag />
    },
]

type Menu = {
    name: string
    url: string
    icon?: React.ReactNode
}

type GroupMenu = {
    name: string
    icon?: React.ReactNode
    menus: Menu[]
}