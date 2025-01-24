import { Table } from "flowbite-react"
import Link from "next/link"
import { PiArrowRightBold } from "react-icons/pi"

export type AppTableColumn = {
    name?:string
    fieldName:string
    link? : (id:string) => string
    convert? : (key:any[]) => any
    className?:string
}

export type AppTableFooter = {
    lable : {
        name : string
        colSpan : number
    }
    value : any
    className? : string
}

export type AppTableRow = {[key:string]:any}

const format = (value:any) => typeof value === 'number' ? value.toLocaleString() : value 

export function TableView({columns, rows, footer}: {
    columns : AppTableColumn[], 
    rows : AppTableRow[],
    footer? : AppTableFooter
}) {
    return (
        <Table hoverable striped>
            <Table.Head>
                {columns.map((col, index) => col.fieldName !== 'seq'
                    ? <Table.HeadCell key={index} className={col.className}>{col.name}</Table.HeadCell>
                    : <Table.HeadCell key={index} className="text-end">No.</Table.HeadCell>
                )}
            </Table.Head>
            
            <Table.Body>
            {rows.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                {columns.map((col, colIndex) =>(
                    <Table.Cell className={col.fieldName !== 'seq' ?  col.className : 'text-end w-10'} key={colIndex}>
                        {getCellValue(col, rowIndex, row)}
                    </Table.Cell>
                ))}    
                </Table.Row>
            ))}
            { footer && (
                <Table.Row>
                    <Table.Cell className={`text-end`} colSpan={footer.lable.colSpan}>
                        {footer.lable.name}
                    </Table.Cell>

                    <Table.Cell className={footer.className}>
                        {format(footer.value)}
                    </Table.Cell>
                </Table.Row>
            )}
            </Table.Body>
        </Table>
    )
}

function getCellValue(col : AppTableColumn, index : number, row : AppTableRow) {

    if(col.fieldName === 'seq') {
        return <span>{`${index + 1}`}</span>
    }

    if(col.link) {
        return (
            <Link href={col.link(row[col.fieldName])}>
                <PiArrowRightBold />
            </Link>
        )
    }

    if(col.convert) {
        const array = col.fieldName.split(',').map(field => row[field])
        return (
            <span>{format(col.convert(array))}</span>
        )
    }

    return format(row[col.fieldName])
}