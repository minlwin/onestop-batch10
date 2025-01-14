export default function FormGroup({children, label, className} :FormGroupType) {
    return (
        <div className={className}>
            <label className="block mb-1">{label}</label>
            <div>
            {children}
            </div>
        </div>
    )
}

type FormGroupType = {
    children:React.ReactNode, 
    label:string, 
    className?:string
}