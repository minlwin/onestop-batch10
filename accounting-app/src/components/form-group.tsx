import { Label } from "flowbite-react"

export default function FormGroup({children, label, className} :FormGroupType) {
    return (
        <div className={className}>
            <Label className="text-cyan-700">{label}</Label>
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