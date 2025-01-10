export default function Option({value}:{value:string}) {
    return (
        <option key={value} value={value}>{value}</option>
    )
}