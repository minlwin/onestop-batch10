'use client'

import FormGroup from "@/components/form-group";
import SubTitle from "@/components/sub-title";
import { SignInForm } from "@/model/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Page() {

    const router = useRouter()
    const {register, handleSubmit, formState: {errors}} = useForm<SignInForm>()

    const signIn = (form:SignInForm) => {
        console.log(form)
        switch(form.password) {
            case "admin":
                router.push('/manager')
                break;
            default:
                router.push('/member')
                break;
        }
    }

    return (
        <form onSubmit={handleSubmit(signIn)}>
            <SubTitle title="Sign In" />

            <FormGroup label="Email" className="my-3">
                <input className="w-full" type="email" {...register('email', {
                    required: "Please enter email."
                })} />
                {errors.email && <span>{errors.email.message}</span>}
            </FormGroup>

            <FormGroup label="Password" className="mb-3">
                <input className="w-full" type="password" {...register('password', {
                    required: "Please enter password.", 
                    minLength: {
                        value: 4,
                        message: "Password must be greater than 4 digit."
                    }, 
                    maxLength: {
                        value: 8,
                        message: "Password must be less than 8 digit."
                    }})} />
                {errors.password && <span>{errors.password.message}</span>}
            </FormGroup>

            <div>
                <Link className="btn" href={'signup'}>
                    Sign Up
                </Link>

                <button type="submit">
                    Sign In
                </button>
            </div>
        </form>    
    )
}