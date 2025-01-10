'use client'

import FormGroup from "@/components/FormGroup";
import SubTitle from "@/components/SubTitle";
import { SignInForm } from "@/model/types";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Page() {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<SignInForm>()

    const signIn = (form:SignInForm) => {
        console.log(form)
    }

    return (
        <form onSubmit={handleSubmit(signIn)}>
            <SubTitle title="Sign In" />

            <FormGroup label="Email" className="mb-3">
                <input className="w-full" type="email" {...register('email', {required: true})} />
                {errors.email && <span>Please enter email</span>}
            </FormGroup>

            <FormGroup label="Password" className="mb-3">
                <input className="w-full" type="password" {...register('password', {required: true, minLength: 4, maxLength: 8})} />
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