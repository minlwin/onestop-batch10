import Link from "next/link"
import { BiArrowToRight } from "react-icons/bi"

export type TableColumn = {
    name?:string
    fieldName:string
    link?:(id:string) => string
    className?:string
}

export type TableViewModel = {
    columns: TableColumn[]
    rows: {[key:string]:any}[]
}

const format = (value:any) => typeof value === 'number' ? value.toLocaleString() : value 

export function TableView({model}: {model:TableViewModel}) {
    return (
        <table>
            <thead>
                <tr>
                {model.columns.map((col, index) => (
                    <th key={index} className={col.className}>{col.name}</th>
                ))}
                </tr>
            </thead>
            <tbody>
            {model.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {model.columns.map((col, colIndex) =>(
                    <td className={col.className} key={colIndex}>
                        {!col.link ? format(row[col.fieldName]) : (
                            <Link href={col.link(row[col.fieldName])}>
                                <BiArrowToRight />
                            </Link>
                        )}
                    </td>
                ))}    
                </tr>
            ))}
            </tbody>
        </table>
    )
}
