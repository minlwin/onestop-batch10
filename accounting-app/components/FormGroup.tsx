export default function FormGroup({label, bottom, children}: FormGroupModel) {
    
    return (
        <div className="mb-3">
            <label>{label}</label>
            {children}
        </div>
    )
}

interface FormGroupModel {
    label:string 
    bottom?:number
    children:React.ReactNode
}