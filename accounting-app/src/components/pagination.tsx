import { usePagination } from "@/model/providers/pagination.provider"
import { Button, Select } from "flowbite-react"
import { PiArrowLeft, PiArrowRight } from "react-icons/pi"

export default function Pagination({pager}: {pager: Pager}) {

    const {setPage, setSize} = usePagination()

    return (
        <nav className="flex gap-2 mt-4">
            {pager.totalPages > 1 && 
                <>
                    <Button onClick={() => setPage(0)}>
                        <PiArrowLeft />
                    </Button>
                    {pager.links.map((page) => (
                        <Button onClick={() => setPage(page)} className={pager.currentPage === page ? 'bg-slate-100 text-slate-700' : ''}>
                            {`${page + 1}`}
                        </Button>
                    ))}
                    <Button onClick={() => setPage(pager.totalPages - 1)}>
                        <PiArrowRight />
                    </Button>
                </>
            }
            <Select onChange={(event) => setSize(Number.parseInt(event.target.value))}>
                <option value="10" selected>10</option>
                <option value="25">25</option>
                <option value="50">50</option>
            </Select>
        </nav>
    )

}

export type Pager = {
    links: number[]
    currentPage: number
    totalPages: number
    totalItems: number
}