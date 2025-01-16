import { Table } from "flowbite-react"
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
        <Table hoverable striped>
            <Table.Head>
                {columns.map((col, index) => (
                    <Table.HeadCell key={index} className={col.className}>{col.name}</Table.HeadCell>
                ))}
            </Table.Head>
            
            <Table.Body>
            {rows.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                {columns.map((col, colIndex) =>(
                    <Table.Cell className={col.className} key={colIndex}>
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
                            <span>{format(row[col.fieldName])}</span>
                        )}    
                        </>
                    </Table.Cell>
                ))}    
                </Table.Row>
            ))}
            </Table.Body>
        </Table>
    )
}
