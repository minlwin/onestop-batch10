export default function Pagination({pager}: {pager: Pager}) {
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className={`page-item ${pager.currentPage <= 1 ? 'disabled' : ''}`}>
                    <a className="page-link" href="#" tabIndex={-1} aria-disabled="true">Previous</a>
                </li>
                {pager.links.map((page) => (
                    <li key={page} className={`page-item ${pager.currentPage === page ? 'active' : ''}`}>
                        <a className="page-link" href="#">{page}</a>
                    </li>
                ))}
                <li className={`page-item ${pager.currentPage >= pager.totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    )

}

export type Pager = {
    links: number[]
    currentPage: number
    totalPages: number
    totalItems: number
}