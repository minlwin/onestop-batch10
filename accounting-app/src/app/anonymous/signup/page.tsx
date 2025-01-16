'use client'

import FormGroup from "@/components/form-group";
import SubTitle from "@/components/sub-title";
import { SignUpForm } from "@/model/types";
import { Button, TextInput } from "flowbite-react";
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
                <TextInput type="text" placeholder="Enter Member Name" {...register('name', {
                    required: "Please enter member name."
                })} />
                {errors.name && <span className="error">{errors.name.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Phone">
                <TextInput type="tel" placeholder="Enter Phone Number" {...register('phone', {
                    required: "Please enter phone number."
                })} />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Email">
                <TextInput type="email" placeholder="Enter Email Address" {...register('email', {
                    required: "Please enter email for login."
                })} />
                {errors.email && <span className="error">{errors.email.message}</span>}
            </FormGroup>

            <FormGroup className="mb-3" label="Password">
                <TextInput type="password" placeholder="Enter Password" {...register('password', {
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
                {errors.email && <span className="error">{errors.email.message}</span>}
            </FormGroup>
            
            <div className="flex gap-2">
                <Button color="teal">
                    <Link href={'signin'}>Sign In</Link>
                </Button>
                <Button type="submit">Sign Up</Button>
            </div>
        </form>
    )
}