import Link from "next/link"
import { BiArrowToRight } from "react-icons/bi"

export type AppTableColumn = {
    name?:string
    fieldName:string
    link? : (id:string) => string
    convert? : (key:string) => string
    className?:string
}

export type AppTableRow = {[key:string]:any}

const format = (value:any) => typeof value === 'number' ? value.toLocaleString() : value 

export function TableView({columns, rows}: {columns : AppTableColumn[], rows : AppTableRow[]}) {
    return (
        <table>
            <thead>
                <tr>
                {columns.map((col, index) => (
                    <th key={index} className={col.className}>{col.name}</th>
                ))}
                </tr>
            </thead>
            <tbody>
            {rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                {columns.map((col, colIndex) =>(
                    <td className={col.className} key={colIndex}>
                        <>
                        {col.link && (
                            <Link href={col.link(row[col.fieldName])}>
                                <BiArrowToRight />
                            </Link>
                        )}
                        </>
                        <>
                        {col.convert && (
                            <span>{col.convert(row[col.fieldName])}</span>
                        )}
                        </>
                        <>
                        {!col.link && !col.convert && (
                            <span>{row[col.fieldName]}</span>
                        )}    
                        </>
                    </td>
                ))}    
                </tr>
            ))}
            </tbody>
        </table>
    )
}
