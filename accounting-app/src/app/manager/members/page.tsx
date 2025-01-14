'use client'
import FormGroup from "@/components/form-group";
import PageTitle from "@/components/page-title";
import { useActiveMenu } from "@/model/providers/active-menu.provider";
import Link from "next/link";
import { useEffect } from "react";
import { BiRightArrow } from "react-icons/bi";

export default function Page() {
    const {setActiveMenu} = useActiveMenu()
    useEffect(() => setActiveMenu('Members'), [])
    return (
        <>
            <PageTitle title="Member Management" />
            <SearchForm />
            <ResultTable />
        </>
    )
}

function SearchForm() {
    return (
        <form className="search-form">
            <FormGroup label="Active State" className="me-4">
                <select>
                    <option value="">All</option>
                    <option value="true">Activated</option>
                    <option value="false">Not Activated</option>
                </select>
            </FormGroup>

            <FormGroup label="Keyword" className="me-4">
                <input type="text" placeholder="Search Keyword" />
            </FormGroup>

            <div className="btn-wrapper">
                <button type="submit">
                    Search
                </button>
            </div>
        </form>
    )
}

function ResultTable() {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Registered At</th>
                    <th>Activated At</th>
                    <th className="w-10"></th>
                </tr>
            </thead>

            <tbody>
                {[1,2,3,4,5].map(item =>
                    <tr key={item}>
                        <td>Use {item}</td>
                        <td>091881718 {item}</td>
                        <td>user{item}@gmail.com</td>
                        <td>{item / 2 === 0 ? 'Activated' : 'Not Yet' }</td>
                        <td>2025-01-10 10:00</td>
                        <td>2025-01-10 12:00</td>
                        <td>
                            <Link href={`/manager/members/${item}`}>
                                <BiRightArrow />
                            </Link>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}