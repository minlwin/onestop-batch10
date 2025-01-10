'use client'

import FormGroup from "@/components/FormGroup";
import SubTitle from "@/components/SubTitle";
import { SignUpForm } from "@/model/types";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Page() {

    const {register, handleSubmit, formState: {errors}} = useForm<SignUpForm>()
    const signUp = (form:SignUpForm) => {
        console.log(form)
    }
    return (
        <form onSubmit={handleSubmit(signUp)}>
            <SubTitle title="Sign Up" />

            <FormGroup className="my-3" label="Name">
                <input type="text" placeholder="Enter Member Name" {...register('name', {
                    required: "Please enter member name."
                })} />
                {errors.name && <span>{errors.name.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Phone">
                <input type="tel" placeholder="Enter Phone Number" {...register('phone', {
                    required: "Please enter phone number."
                })} />
                {errors.phone && <span>{errors.phone.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Email">
                <input type="email" placeholder="Enter Email Address" {...register('email', {
                    required: "Please enter email for login."
                })} />
                {errors.email && <span>{errors.email.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Password">
                <input type="password" placeholder="Enter Password" {...register('password', {
                    required: "Please enter password.",
                    minLength: {
                        value: 4,
                        message: "Password must be greater than 4 digit."
                    },
                    maxLength: {
                        value: 8,
                        message: "Password must be less than 8 digit."
                    }
                })} />
            </FormGroup>
            
            <div>
                <Link href={'signin'} className="btn">Sign In</Link>
                <button type="submit">Sign Up</button>
            </div>
        </form>
    )
}