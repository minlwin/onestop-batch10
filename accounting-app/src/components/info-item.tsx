export default function InfoItem({label, value}:InfoItemType) {
    return (
        <div className="mb-2 pb-1 border-b-2 border-solid">
            <label className="inline-block text-sm text-gray-400">{label}</label>
            <span className="block">{value}</span>
        </div>
    ) 
} 

type InfoItemType = {
    label:string
    value:string
}