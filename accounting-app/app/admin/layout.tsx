"use client"

import ActiveMenuProvider, { useActiveMenu } from "@/model/states/ActiveMenuProvider";
import { useLoginUser } from "@/model/states/LoginUserState";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiHome } from "react-icons/bi";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ActiveMenuProvider>
      {/* Nav Bar */}
      <NavBar />

      {/* Content */}
      <main className="py-4 px-16">
        {children}
      </main>
    </ActiveMenuProvider>
  )
}

function NavBar() {
  const {activeMenu} = useActiveMenu()
  const {setUser} = useLoginUser()
  const router = useRouter()

  const logout = () => {
    setUser(undefined)
    router.push('/')
  }
  return (
    <nav className="bg-black text-gray-300 px-16 py-4 flex justify-between">
        <Link href="/admin" className="flex items-center">
          <BiHome className="inline-block me-1" size={20} /> Balance Admin
        </Link>

        <ul className="flex navbar-nav">
          <li>
            <Link href="/admin/members" className={activeMenu === 'member' ? 'active' : ''}>Member Management</Link>
          </li>

          <li>
            <a href="#" onClick={logout}>Sign Out</a>
          </li>
        </ul>
    </nav>
  )
}
